import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import bodyParser from 'body-parser';
import cors from 'cors';
import edamamRouter from './edamamRouter.js';

const app = express();
const port = 8000;

dotenv.config();

// const openai = new OpenAI({
//     apiKey: process.env.OPENAI_API_KEY,
// });

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use('/edamam', edamamRouter);

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