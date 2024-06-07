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
                let savedRecipes = [];
                let createdRecipes = [];

                // Fetch recipe objects for each recipe in savedRecipes
                const savedRecipePromises = jsonData.savedRecipes.map(recipeId => {
                    return new Promise ((resolve, reject) => {
                        request.get(`http://localhost:8000/recipe/${recipeId}`, function (error, response, body) {
                        if (!error && response.statusCode === 200) {
                            resolve(JSON.parse(body));
                        } else {
                            reject(error);
                        }
                    });
                    })
                });

                // Fetch recipe objects for each recipe in createdRecipes
                const createdRecipePromises = jsonData.createdRecipes.map(recipeId => {
                    return new Promise((resolve, reject) => {
                        request.get(`http://localhost:8000/recipe/${recipeId}`, function (error, response, body) {
                            if (!error && response.statusCode === 200) {
                                resolve(JSON.parse(body));
                            } else {
                                reject(error);
                            }
                        });
                    });
                });

                Promise.all([...savedRecipePromises, ...createdRecipePromises]) 
                    .then(recipes => {
                        savedRecipes = recipes.slice(0, jsonData.savedRecipes.length);
                        createdRecipes = recipes.slice(jsonData.savedRecipes.length);
                        
                        res.status(200).json({
                            savedRecipes: savedRecipes,
                            createdRecipes: createdRecipes
                        });
                    })
                    .catch(err => {
                        res.status(400).send(err);
                    })
            } else {
                res.status(400).send(error);
            }
        });
    } catch (e) {
        res.status(400).send(e);
    }

});

export default router;