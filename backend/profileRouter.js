import express from 'express';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { db, storage } from './firebase';

const router = express.Router();

router.post('/register', async (req, res) => {
    const { email, password, name, profilePictureURL } = req.body;

    try {
        const uid = uuidv4();
        await setDoc(doc(db, 'users', uid), {
            email,
            name,
            profilePictureURL,
        });
        res.status(200).json({ uid });
    } catch (error) {
        res.status(500).json({ error: 'Failed to register user' });
    }
});

router.post('/upload-profile-picture', async (req, res) => {
    const profilePicture = req.files.profilePicture;
    const fileName = `${uuidv4()}_${profilePicture.name}`;
    const storageRef = ref(storage, `profilePictures/${fileName}`);

    try {
        const snapshot = await uploadBytes(storageRef, profilePicture.data);
        const downloadURL = await getDownloadURL(snapshot.ref);
        res.status(200).json({ url: downloadURL });
    } catch (error) {
        res.status(500).json({ error: 'Failed to upload profile picture' });
    }
});

router.get('/user/:uid', async (req, res) => {
    const uid = req.params.uid;

    try {
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            res.status(200).json(docSnap.data());
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve user data' });
    }
});

export default router;
