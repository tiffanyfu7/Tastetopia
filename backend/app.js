import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import edamamRouter from './edamamRouter.js';
import openAIRouter from './openAIRouter.js';
import recipeRouter from './recipeRouter.js';

const app = express();
const port = 8000;

dotenv.config();

app.use(cors());
app.use(express.json());
app.use('/edamam', edamamRouter);
app.use('/openai', openAIRouter);
app.use('/recipe', openAIRouter);

app.get('/hello-world', async (req, res) => {
    try {
        console.log('Hello world');
        res.status(200).json({ message: 'hello world'});
    } catch (e) {
        res.status(400).send(e);
    }
}) 


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});