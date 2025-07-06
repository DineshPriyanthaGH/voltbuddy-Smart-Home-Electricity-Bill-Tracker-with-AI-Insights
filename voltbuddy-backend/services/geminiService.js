require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function getEnergyTipsFromGemini(billHistory, applianceUsage) {
  try {
    const prompt = `
Based on the following user's bill history and appliance usage, generate 5 actionable energy-saving tips in the following JSON array format:

[
  {
    "title": "Use your washing machine during off-peak hours",
    "description": "Running your washing machine during off-peak hours can save you up to 20% on energy costs for laundry.",
    "learnMore": "https://www.energy.gov/energysaver/when-use-appliances"
  }
  // ...more tips
]

- Tips should be specific and personalized to the user's appliances and usage.
- Include potential savings if possible.
- Each tip must have a concise title, a practical description, and a relevant 'learnMore' URL (real or generic).
- Do NOT include any text except the JSON array.

User Bill History: ${JSON.stringify(billHistory)}
User Appliance Usage: ${JSON.stringify(applianceUsage)}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        maxOutputTokens: 600,
        temperature: 0.7,
      },
    });

    // Parse the JSON array from the Gemini response
    let tips;
    try {
      // Remove any code block markers or extra text
      const jsonStart = response.text.indexOf('[');
      const jsonEnd = response.text.lastIndexOf(']');
      const jsonString = response.text.substring(jsonStart, jsonEnd + 1);
      tips = JSON.parse(jsonString);
    } catch (parseErr) {
      console.error('Gemini response parse error:', parseErr, response.text);
      throw new Error('Failed to parse energy-saving tips from AI');
    }

    // Validate/clean the tips array
    return (Array.isArray(tips) ? tips : []).map(tip => ({
      title: tip.title || '',
      description: tip.description || '',
      learnMore: tip.learnMore || 'https://www.energy.gov/energysaver/energy-saver',
    }));

  } catch (error) {
    console.error('Error generating energy tips:', error);
    throw new Error('Failed to generate energy-saving tips');
  }
}

module.exports = { getEnergyTipsFromGemini };
