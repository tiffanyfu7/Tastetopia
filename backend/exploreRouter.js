import express from 'express';
import request from 'request';
import { db } from "./firebase.js";
import { collection, getDocs, updateDoc, doc, setDoc, addDoc, deleteDoc, getDoc } from "firebase/firestore";
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        // Fetch all user-created recipes from the database
        request.get('http://localhost:8000/recipe', function (error, response, body) {
            if (!error && response.statusCode === 200) {
                const filteredRecipes = JSON.parse(body).filter((recipe) => recipe.uri === null);

                res.status(200).send(filteredRecipes);
            }
        });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/set-default', async (req, res) => {
    try {
        // TODO
    } catch (e) {
        res.status(400).send(e);
    }
});

export default router;