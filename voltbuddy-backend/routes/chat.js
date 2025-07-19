const express = require('express');
const router = express.Router();
const { GoogleGenAI } = require('@google/genai');
const { getChatbotResponse } = require('../services/geminiService');
const { authMiddleware } = require('../middleware/authMiddleware');
const User = require('../models/User');


const apiKey = process.env.GEMINI_API_KEY;
console.log('Loaded GEMINI_API_KEY:', apiKey ? '[REDACTED]' : 'undefined or empty');

if (!apiKey) {
  console.error('ERROR: GEMINI_API_KEY not set in environment variables.');
}

const ai = new GoogleGenAI({ apiKey });


const SYSTEM_INSTRUCTION = `
You are VoltBuddy, a friendly AI assistant specialized in electricity bills and electricity taxes in Sri Lanka.
Answer questions related to electricity bills, taxes, payments, due dates, rates, and policies.
If the user asks your name, respond with "Name: VoltBuddy".
If the question is unrelated, politely say you can only answer electricity-related queries.
`;

router.post('/gemini', async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message is required' });

  try {
  
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


router.post('/gemini-chat', async (req, res) => {
  console.log('GEMINI_API_KEY on request:', apiKey ? '[REDACTED]' : 'undefined or empty');
  const { history } = req.body; 

  if (!history || !Array.isArray(history)) {
    return res.status(400).json({ error: 'History array is required' });
  }

  try {
    const chat = ai.chats.create({
      model: 'gemini-2.0-flash',
      history,
    });

    const response = await chat.sendMessage({
      message: history[history.length - 1].parts[0].text,
    });

    res.json({ reply: response.text });
  } catch (error) {
    console.error('Google GenAI chat error:', error.response?.data || error.message || error);
    res.status(500).json({ reply: 'Failed to get chat response from Gemini API.' });
  }
});

// Data-aware chatbot endpoint that accesses user's energy data
router.post('/ask', authMiddleware, async (req, res) => {
  try {
    const { query } = req.body;
    
    if (!query) {
      return res.status(400).json({ error: 'Query is required' });
    }

    // Fetch user's complete energy data including all user information
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Prepare comprehensive user data for the chatbot
    const userData = {
      userProfile: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        address: user.address,
        contactNo: user.contactNo,
        createdAt: user.createdAt,
        lastLoginAt: user.lastLoginAt,
        isActive: user.isActive
      },
      appliances: user.appliances.map(app => ({
        name: app.name,
        type: app.type,
        wattage: app.powerRating, // powerRating in the model
        usedHoursPerDay: app.usedHoursPerDay,
        monthlyUsage: app.monthlyUsage
      })),
      billHistory: user.bills.map(bill => ({
        month: bill.month,
        year: bill.year,
        consumption: bill.consumption,
        amount: bill.billAmount,
        dueDate: bill.dueDate,
        status: bill.status
      })),
      notifications: user.notifications.map(notif => ({
        type: notif.type,
        title: notif.title,
        message: notif.message,
        read: notif.read,
        createdAt: notif.createdAt
      })),
      energyTips: user.futureEnergyTips.map(tip => ({
        title: tip.title,
        description: tip.description,
        icon: tip.icon
      })),
      electricityRate: 0.15 // Default rate per kWh (can be made configurable)
    };

    // Get AI response based on user's complete data
    const response = await getChatbotResponse(query, userData);
    
    res.json({ 
      query: query,
      response: response 
    });

  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ 
      error: 'Failed to process your question. Please try again.',
      response: "I'm having trouble accessing your data right now. Please try again in a moment."
    });
  }
});

module.exports = router;
