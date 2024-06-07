import express from 'express';
import request from 'request';
import { db } from "./firebase.js";
import { collection, getDocs, updateDoc, doc, setDoc, addDoc, deleteDoc, getDoc } from "firebase/firestore";
const router = express.Router();

router.get('/get-all/:id', async (req, res) => {
    const userId = req.params.id;
    try {
        request.get(`http://localhost:8000/profile/user/${userId}`, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                const jsonData = JSON.parse(body);
                res.status(200).json({ 
                    createdRecipes: jsonData.createdRecipes,
                    savedRecipes: jsonData.savedRecipes
                });
            } else {
                res.status(400).send(error);
            }
        });
    } catch (e) {
        res.status(400).send(e);
    }

});

export default router;