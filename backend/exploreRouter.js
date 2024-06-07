import express from 'express';
import request from 'request';
import { db } from "./firebase.js";
import { collection, getDocs, updateDoc, doc, setDoc, addDoc, deleteDoc, getDoc } from "firebase/firestore";
const router = express.Router();

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

router.get('/get-all', async (req, res) => {
    try {
        request.get('http://localhost:8000/explore/get-user-recipes', function (error, response, body) {
            if (!error && response.statusCode === 200) {
                const userRecipes = JSON.parse(body);
                // console.log(userRecipes);

                request.get('http://localhost:8000/explore/get-default', function (error, response, body) {
                    if (!error && response.statusCode === 200) {
                        const defaultAPIRecipes = JSON.parse(body);
                        const allRecipes = [...userRecipes, ...defaultAPIRecipes];
                        const shuffledRecipes = shuffleArray(allRecipes);

                        res.status(200).send(shuffledRecipes);
                    } else {
                        res.status(400).send(error);
                    }
                });

            } else {
                res.status(400).send(error);
            }
        });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.get('/get-user-recipes', async (req, res) => {
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

router.get('/get-default', async (req, res) => {
    try {
        request.get('http://localhost:8000/recipe', function (error, response, body) {
            if (!error && response.statusCode === 200) {
                const filteredRecipes = JSON.parse(body).filter((recipe) => recipe.default === true);
                res.status(200).send(filteredRecipes);
            }
        });
    } catch (e) {
        res.status(400).send(e);
    }
});

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