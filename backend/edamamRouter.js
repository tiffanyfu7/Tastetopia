import express from 'express';
import request from 'request';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

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

router.post('/fetch/:id', async (req, res) => {
    const recipeId = req.params.id;
    try {
        request.get(`https://api.edamam.com/api/recipes/v2/${recipeId}?type=public&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_API_KEY}`,
            function (error, response, body) {

            if (!error && response.statusCode === 200) {
                const data = JSON.parse(body);
                const recipe = {
                    'title': data.recipe.label,
                    'author': data.recipe.source,
                    'image': data.recipe.image,
                    'sourceURL': data.recipe.url,
                    'uri': data.recipe.uri,
                    'totalTime': data.recipe.totalTime,
                    'yield': data.recipe.yield,
                    'cuisineType': data.recipe.cuisineType,
                    'dietLabels': data.recipe.dietLabels,
                    'healthLabels': data.recipe.healthLabels,
                    'ingredients': data.recipe.ingredientLines,
                    'mealType': data.recipe.mealType,
                    'dishType': data.recipe.dishType,
                    'calories': data.recipe.calories,
                    'fat': data.recipe.digest[0].total,
                    'carbs': data.recipe.digest[1].total,
                    'protein': data.recipe.digest[2].total,
                    'rating': 4.5,
                    'id': recipeId,    
                };
                res.status(200).json(recipe);
            } else {
                res.status(400).send(error);
            }
        });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/search', async (req, res) => {
    const q = req.body.q;
    try {    
        request.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${q}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_API_KEY}`, 
            function(error, response, body) {
            
            if (!error && response.statusCode === 200) {
                let recipes = [];
                const jsonData = JSON.parse(body);
                jsonData.hits.forEach(instance => {
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
                        'rating': 4.5,
                        'id': extractRecipeId(instance.recipe.uri),
                    });
                })

                // Need to consult these recipes with the database to see if any of them
                // have previous ratings or comments

                res.status(200).json(recipes);
            } else {
                res.status(response.statusCode).send('Error searching Edamam');
            }

        });
        
    } catch (e) {
        res.status(400).send(e);
    }
})

export default router;