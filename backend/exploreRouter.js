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

// Method to extract a recipe's ID
const extractRecipeId = (uri) => {
    const parts = uri.split('#');
    if (parts.length > 1) {
        const recipePart = parts[1];
        
        if (recipePart.startsWith('recipe_')) {
            return recipePart.substring(7);
        }
    }
    return null;
};

router.post('/set-default', async (req, res) => {
    const defaultData = [];
    try {
        // TODO
        let recipes = [];

        defaultData.hits.forEach(instance => {
            recipes.push({
                'title': instance.recipe.label,
                'author': instance.recipe.source,
                'image': instance.recipe.image,
                'sourceURL': instance.recipe.url,
                'uri': instance.recipe.uri,
                'totalTime': instance.recipe.totalTime,
                'yield': instance.recipe.yield,
                'cuisineType': instance.recipe.cuisineType,
                'dietLabels': instance.recipe.dietLabels,
                'healthLabels': instance.recipe.healthLabels,
                'ingredients': instance.recipe.ingredientLines,
                'mealType': instance.recipe.mealType,
                'dishType': instance.recipe.dishType,
                'calories': instance.recipe.calories,
                'fat': instance.recipe.digest[0].total,
                'carbs': instance.recipe.digest[1].total,
                'protein': instance.recipe.digest[2].total,
                'rating': 0,
                'reviews': {},
                'id': extractRecipeId(instance.recipe.uri),
                'verified': true,
                'default': true
            });
        });
        
        // Add recipes to database
        recipes.forEach(async (recipe) => {
            await setDoc(doc(db, 'Recipe', recipe.id), recipe);
        });

        res.status(200).json({ message: 'Success!' })

    } catch (e) {
        res.status(400).send(e);
    }
});

export default router;