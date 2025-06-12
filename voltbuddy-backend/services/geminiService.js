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
      model: "gemini-2.0-flash",  // Specify the model
      contents: content,  // Pass the input (bill history and appliance usage)
      config: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });

    // Split the response into lines (each line represents a tip)
    const tips = response.text.split('\n').map((tip, index) => {
      const description = tip.trim();  // Clean up any extra whitespace
      
      // If a description is missing or empty, provide a default
      if (!description) {
        return null;  // Return null for tips without a valid description
      }

      // Return the tip with a proper title and description
      return {
        title: `Tip ${index + 1}`,
        description: description || "No description available", // Default description if empty
      };
    }).filter(Boolean);  // Remove null or invalid tips

    return tips; // Return the valid tips
  } catch (error) {
    console.error('Error generating energy tips:', error);
    throw new Error('Failed to generate energy-saving tips');
  }
}

module.exports = { getEnergyTipsFromGemini };
