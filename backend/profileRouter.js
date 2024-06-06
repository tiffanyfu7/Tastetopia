import express from 'express';
import { db, storage } from './firebase.js';
import { doc, setDoc, getDoc } from 'firebase/firestore';
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

//Endpoint to make guest user
router.post('/create-guest', async (req, res) => {
    const { uid } = req.body;

    if (!uid) {
        return res.status(400).send('Missing required fields');
    }

    try {
        const userData = {
            uid,
            email: "Guest",
            name: "Guest",
            bio: "Add a bio...",
            savedRecipes: [],
            createdRecipes: [],
            isAdmin: false,
            profilePictureUrl: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
        };

        const userDocRef = doc(db, "Users", uid);
        await setDoc(userDocRef, userData);

        res.status(200).send(userData);
    } catch (error) {
        console.error("Error creating anonymous user profile:", error);
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

export default router;
