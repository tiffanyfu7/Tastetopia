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
                    console.log(instance.recipe.label);
                })
                res.status(200).json(body);
            } else {
                res.status(response.statusCode).send('Error searching Edamam');
            }

        });
        
    } catch (e) {
        res.status(400).send(e);
    }
})

export default router;