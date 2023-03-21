import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';
import { Conversation } from '@maxijonson/gpt-turbo';
const port = process.env.PORT || 5000;

dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'Welcome to Genus SMART AI!'
  })
});

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const conversation = new Conversation({
      apiKey: process.env.OPENAI_API_KEY,
  });
  const response = await conversation.prompt(`${prompt}`);
    res.status(200).send({
      bot: response,
    });

  } catch (error) {
    console.error(error)
    res.status(500).send('Network busy. Please try again' || 'Something went wrong');
  }
});
app.listen(port, () => console.log(`Server started on port http://localhost:${port}`));