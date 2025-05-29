const express = require('express');
const router = express.Router();
const axios = require('axios');

// Gemini API key from environment variables
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

router.post('/gemini', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Example Gemini API call (modify as per Gemini API docs)
    const response = await axios.post('https://api.gemini.com/v1/chat', {
      prompt: message,
      max_tokens: 150,
      temperature: 0.7,
    }, {
      headers: {
        Authorization: `Bearer ${GEMINI_API_KEY}`,
        'Content-Type': 'application/json',
      }
    });

    // Extract the reply from the Gemini response
    const reply = response.data.choices?.[0]?.text?.trim() || "Sorry, I couldn't generate a response.";

    res.json({ reply });
  } catch (error) {
    console.error('Error contacting Gemini API:', error.message);
    res.status(500).json({ reply: 'Failed to get response from Gemini API.' });
  }
});

module.exports = router;
