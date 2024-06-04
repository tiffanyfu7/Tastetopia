import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import OpenAI from 'openai';
const router = express.Router();
router.use(bodyParser.json());
dotenv.config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

router.post("/chat", async (req, res) => {
	const model = req.body.model;
	const messages = req.body.messages;

	try {
		const response = await openai.chat.completions.create({
			model: model,
			messages: messages,
		});
		res.status(200).json(response.choices[0].message);
	} catch (error) {
		console.error("Error fetching response: ", error);
	}
});

export default router;