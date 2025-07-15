require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

/**
 * Helper: Robustly extract and parse a JSON array from AI output.
 */
function robustParseJsonArray(text) {
  // Remove markdown code block markers (if present)
  text = text.replace(/``````/g, '');

  // Extract array from first [ to last ]
  const start = text.indexOf('[');
  const end = text.lastIndexOf(']');
  if (start === -1 || end === -1 || end <= start) throw new Error('No valid JSON array found');
  let jsonStr = text.slice(start, end + 1);

  // Remove trailing commas before ] or }
  jsonStr = jsonStr.replace(/,\s*]/g, ']').replace(/,\s*}/g, '}');

  try {
    return JSON.parse(jsonStr);
  } catch (e) {
    // If parsing fails, try to remove the last (likely incomplete) object
    const lastObjEnd = jsonStr.lastIndexOf('},');
    if (lastObjEnd === -1) throw e;
    const fixedStr = jsonStr.slice(0, lastObjEnd + 1) + ']';
    return JSON.parse(fixedStr);
  }
}

/**
 * Generate energy-saving tips using Gemini AI.
 * Returns array of { title, description, learnMore }
 */
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

    let tips;
    try {
      tips = robustParseJsonArray(response.text);
    } catch (parseErr) {
      console.error('Gemini response parse error (energy tips):', parseErr, response.text);
      throw new Error('Failed to parse energy-saving tips from AI');
    }

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

/**
 * Generate cost reduction strategies using Gemini AI.
 * Returns array of { title, summary, details, learnMore, problem, strategy, controls }
 */
async function getCostStrategiesFromGemini(billHistory, applianceUsage) {
  try {
    const prompt = `
Based on the user's bill history and appliance usage, generate 7 actionable cost reduction strategies in the following JSON array format:

[
  {
    "title": "Optimize Appliance Usage",
    "summary": "Learn how to use high-energy appliances more efficiently to reduce your energy consumption.",
    "details": [
      "Run full loads in dishwashers and washing machines",
      "Use cold water for laundry when possible",
      "Clean lint filters in dryers regularly"
    ],
    "learnMore": "https://www.energy.gov/energysaver/when-use-appliances",
    "problem": "High energy bills due to inefficient appliance use.",
    "strategy": "Optimize appliance usage by following best practices.",
    "controls": [
      "Schedule laundry during off-peak hours",
      "Avoid using multiple high-power appliances simultaneously"
    ]
  }
  // ...more strategies
]

- Strategies should be specific and personalized to the user's appliances and usage.
- Each strategy must have: title, summary, details (array), learnMore (URL), problem, strategy, controls (array).
- Do NOT include any text except the JSON array.

User Bill History: ${JSON.stringify(billHistory)}
User Appliance Usage: ${JSON.stringify(applianceUsage)}
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        maxOutputTokens: 700,
        temperature: 0.7,
      },
    });

    let strategies;
    try {
      strategies = robustParseJsonArray(response.text);
    } catch (parseErr) {
      console.error('Gemini response parse error (cost strategies):', parseErr, response.text);
      throw new Error('Failed to parse cost reduction strategies from AI');
    }

    return (Array.isArray(strategies) ? strategies : []).map(s => ({
      title: s.title || '',
      summary: s.summary || '',
      details: Array.isArray(s.details) ? s.details : [],
      learnMore: s.learnMore || 'https://www.energy.gov/energysaver/energy-saver',
      problem: s.problem || '',
      strategy: s.strategy || '',
      controls: Array.isArray(s.controls) ? s.controls : [],
    }));
  } catch (error) {
    console.error('Error generating cost reduction strategies:', error);
    throw new Error('Failed to generate cost reduction strategies');
  }
}

module.exports = {
  getEnergyTipsFromGemini,
  getCostStrategiesFromGemini
};
