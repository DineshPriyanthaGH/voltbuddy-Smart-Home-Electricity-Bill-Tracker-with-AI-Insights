// services/geminiService.js
require('dotenv').config();  // Load environment variables from .env
const { GoogleGenAI } = require('@google/genai'); // Import GoogleGenAI SDK

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY }); // Initialize the API with the key

// Function to interact with the Gemini API and get energy-saving tips
async function getEnergyTipsFromGemini(billHistory, applianceUsage) {
  try {
    const content = `
      Based on the following bill history and appliance usage, generate energy-saving tips:

      Bill History: ${JSON.stringify(billHistory)}

      Appliance Usage: ${JSON.stringify(applianceUsage)}

      Provide tips that could help reduce energy consumption.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",  
      contents: content,  
      config: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    
    const tips = response.text.split('\n').map((tip, index) => {
      const description = tip.trim();  
      
     
      if (!description) {
        return null; 
      }

      
      return {
        title: `Tip ${index + 1}`,
        description: description || "No description available", 
      };
    }).filter(Boolean); 
    return tips; 
  } catch (error) {
    console.error('Error generating energy tips:', error);
    throw new Error('Failed to generate energy-saving tips');
  }
}

module.exports = { getEnergyTipsFromGemini };
