import express from 'express';
import request from 'request';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/search', async (req, res) => {
    const q = req.body.q;
    try {    
        request.get(`https://api.edamam.com/api/recipes/v2?type=public&q=${q}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_API_KEY}`, 
            function(error, response, body) {
            
            if (!error && response.statusCode === 200) {
                let recipes = [];
                const jsonData = JSON.parse(body);
                jsonData.hits.forEach(instance => {
                    console.log('title: ', instance.recipe.label);
                    console.log('author: ', instance.recipe.source);
                    console.log('image: ', instance.recipe.image);
                    console.log('source_url: ', instance.recipe.url);
                    console.log('uri: ', instance.recipe.uri);
                    console.log('\n\n')
                })
                res.status(200).json(jsonData);
            } else {
                res.status(response.statusCode).send('Error searching Edamam');
            }

        });
        
    } catch (e) {
        res.status(400).send(e);
    }
})

export default router;