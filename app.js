require('dotenv').config();
const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.prompt;

    if (userMessage.toLowerCase() === "start") {
      return res.json({ response: "Hi, I am DearMind, your personal therapist. How can I help you today?" });
    }

    const chatCompletion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        { role: "system", content: "You are a helpful therapy assistant called DearMind." },
        { role: "user", content: userMessage }
      ]
    });

    const botResponse = chatCompletion.choices[0].message.content;
    res.json({ response: botResponse });

  } catch (error) {
    console.error(error);
    res.status(500).send('An error occurred while generating a response.');
  }
});

app.listen(3000, () => {
  console.log('DearMind is running on http://localhost:3000');
});
