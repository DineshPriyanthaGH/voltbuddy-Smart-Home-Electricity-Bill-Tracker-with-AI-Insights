const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');

// Load API key from environment variables
const apiKey = process.env.GEMINI_API_KEY;
console.log('Loaded GEMINI_API_KEY:', apiKey ? '[REDACTED]' : 'undefined or empty');

if (!apiKey) {
  console.error('ERROR: GEMINI_API_KEY not set in environment variables.');
}

const ai = new GoogleGenAI({ apiKey });

// Single-turn generateContent example
router.post('/gemini', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    // Call generateContent as per official docs
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash', // or another valid model from ListModels
      contents: message,
      // Optional config object for system instructions, temperature, etc.
      // config: { systemInstruction: "You are a helpful assistant." }
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error('Google GenAI error:', error.response?.data || error.message || error);
    res.status(500).json({ reply: 'Failed to get response from Gemini API.' });
  }
});

// Multi-turn chat example
router.post('/gemini-chat', async (req, res) => {
    console.log('GEMINI_API_KEY on request:', apiKey ? '[REDACTED]' : 'undefined or empty');
  const { history } = req.body; // history is array of chat messages [{ role: "user", parts: [{text:"..."}]}, ...]
  if (!history || !Array.isArray(history)) {
    return res.status(400).json({ error: 'History array is required' });
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.0-flash',
      history,
    });

    const response = await chat.sendMessage({
      message: history[history.length - 1].parts[0].text, // latest user message
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error('Google GenAI chat error:', error.response?.data || error.message || error);
    res.status(500).json({ reply: 'Failed to get chat response from Gemini API.' });
  }
});

module.exports = router;
