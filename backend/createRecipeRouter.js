import express from 'express';
import { db, storage } from './firebase.js';
import { collection, doc, addDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// Endpoint to store image
router.post('/uploadImage', async (req, res) => {
    const image = req.files?.image;

    try {
        if (!image) {
            return res.status(400).json({ message: 'No image provided' });
        }

        const imageFileName = `${uuidv4()}_${image.name}`;
        const storageRef = ref(storage, `createRecipePictures/${imageFileName}`);
        await uploadBytes(storageRef, image.data);
        const imageUrl = await getDownloadURL(storageRef);

        res.status(200).json({ message: 'Image stored successfully', imageUrl });
    } catch (error) {
        console.error('Error storing image:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Endpoint to create a new recipe
router.post('/:id', async (req, res) => {
    try {
        const recipeData = req.body;
        const id = req.params.id;
        const recipeRef = await setDoc(doc(db, "Recipe"), recipeData);
        const userRef = doc(db, "Users", id);
        await updateDoc(userRef, {
            createdRecipes: arrayUnion(recipeRef.id)
        });

        res.status(200).json({ message: 'Recipe created successfully', recipeId: recipeRef.id });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
});

export default router;