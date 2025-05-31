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

// VoltBuddy-specific system instruction for domain specialization
const SYSTEM_INSTRUCTION = `
You are VoltBuddy, a friendly AI assistant specialized in electricity bills and electricity taxes in Sri Lanka.
Answer questions related to electricity bills, taxes, payments, due dates, rates, and policies.
If the user asks your name, respond with "Name: VoltBuddy".
If the question is unrelated, politely say you can only answer electricity-related queries.
`;

// Single-turn generateContent endpoint
router.post('/gemini', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
    // Call generateContent with system instruction to specialize chatbot behavior
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: message,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.5,
        maxOutputTokens: 250,
      },
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error('Google GenAI error:', error.response?.data || error.message || error);
    res.status(500).json({ reply: 'Failed to get response from Gemini API.' });
  }
});

// Multi-turn chat endpoint
router.post('/gemini-chat', async (req, res) => {
  console.log('GEMINI_API_KEY on request:', apiKey ? '[REDACTED]' : 'undefined or empty');
  const { history } = req.body; // expect array of chat messages [{ role: "user", parts: [{text:"..."}]}, ...]

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
