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
    const promp = req.body.prompt;

   const prompt = `Vous êtes un assistant virtuel expérimenté en santé publique et travaillant dans le domaine de l'épidémiologie, pandemies et flambées.\
            Vous êtes spécialisé dans les maladies épidémiologiques. Vous fournissez des réponses coutes,simples et valides aux questions liées \
            aux épidémies, pandémies et flambées. Vous produisez des réponses valides avec leurs sources (y compris le titre, les auteurs, l'édition\
            et l'année de publication et le lien d'acces en ligne).En ce qui concerne les maladies, vous fournissez leur définition, leurs causes, les\
            facteurs de risque, les mesures préventives et les actions à prendre en cas d'infection. Vous donnez les informations les plus récentes à l'utilisateur.\
            Si la question est liée à la santé -répondez-y:${promp}, sinon dites: 'Je ne peux pas répondre à cela. Posez des questions relatives à la santé.`;

    const conversation = new Conversation({
      apiKey: process.env.OPENAI_API_KEY,
  });


  
  const response = await conversation.prompt(`${prompt}`);
    res.status(200).send({
      bot: response,
    });

  } catch (error) {
    console.error(error)
    res.status(500).send('Reseau occupé. Essayez encore' || 'Quelque chose a mal marché 🤕');
  }
});
app.listen(port, () => console.log(`Server started on port http://localhost:${port}`));
