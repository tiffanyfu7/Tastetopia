import express from 'express';
import { db, storage } from './firebase.js';
import { doc, updateDoc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const router = express.Router();

// Endpoint for creating a user profile
router.post('/create', async (req, res) => {
    const { uid, email, name, bio, savedRecipes, createdRecipes} = req.body;
    const profilePicture = req.files?.profilePicture;

    if (!uid || !email || !name) {
        return res.status(400).send('Missing required fields');
    }

    try {
        let profilePictureUrl = '';
        if (profilePicture) {
            const storageRef = ref(storage, `profilePictures/${uid}`);
            await uploadBytes(storageRef, profilePicture.data);
            profilePictureUrl = await getDownloadURL(storageRef);
        }

        const userData = {
            uid,
            email,
            name,
            bio: bio || "Add a bio...",
            savedRecipes: savedRecipes || [],
            createdRecipes: createdRecipes || [],
            isAdmin: false,
            profilePictureUrl
        };

        const userDocRef = doc(db, "Users", uid);
        await setDoc(userDocRef, userData);

        res.status(200).send('User profile created successfully');
    } catch (error) {
        console.error("Error creating user profile:", error);
        res.status(500).send('Internal server error');
    }
});

// Endpoint for getting user profile data
router.get('/user/:uid', async (req, res) => {
    const { uid } = req.params;

    try {
        const userDocRef = doc(db, "Users", uid);
        const userDoc = await getDoc(userDocRef);

        if (!userDoc.exists()) {
            return res.status(404).send('User not found');
        }

        res.status(200).json(userDoc.data());
    } catch (error) {
        console.error("Error getting user profile:", error);
        res.status(500).send('Internal server error');
    }
});

// post save recipes to user
router.put('/user/:uid', async (req, res) => {

    const { uid } = req.params;
    const recipeToSave = req.body.recipeId
    console.log("recipeToSave", recipeToSave);
    console.log("req.body", req.body);

    try {
        const userDocRef = doc(db, "Users", uid);
        const userDoc = await getDoc(userDocRef);

        const curSaved = userDoc.data().savedRecipes;
        const newSaved = [...curSaved, recipeToSave]

        console.log(newSaved)

        try{
            await updateDoc(userDocRef, {
                savedRecipes: newSaved
            })
        } catch(e) {
            console.error('cant save recipe', e.message);
        }


        if (!userDoc.exists()) {
            return res.status(404).send('User not found');
        }

        res.status(200).json(userDoc.data());
    } catch (error) {
        console.error("Error updating saved field:", error);
        res.status(500).send('Internal server error');
    }
});

export default router;
