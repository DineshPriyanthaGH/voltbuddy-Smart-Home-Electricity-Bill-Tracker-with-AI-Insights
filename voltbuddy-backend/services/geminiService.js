// services/geminiService.js
const fetch = require('node-fetch');

// Function to interact with Gemini API and get energy-saving tips
async function getEnergyTipsFromGemini(billHistory, applianceUsage) {
  try {
    const response = await fetch('https://api.gemini.com/energy-tips', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer AIzaSyDBFlr2UtARy-M1z7hQvpvWcDClq0RfLaY`,  // Replace with your actual Gemini API key
      },
      body: JSON.stringify({
        billHistory,
        applianceUsage,
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to fetch energy tips');
    }

    const data = await response.json();
    return data.tips;  // Assuming Gemini API returns tips in a "tips" field
  } catch (error) {
    throw new Error(error.message || 'Error fetching future tips from Gemini');
  }
}

module.exports = { getEnergyTipsFromGemini };
