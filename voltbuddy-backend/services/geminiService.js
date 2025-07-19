require('dotenv').config();
const { GoogleGenAI } = require('@google/genai');

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// -------- Add Both Helper Functions! --------
function robustParseJsonObject(text) {
  const jsonStart = text.indexOf('{');
  const jsonEnd = text.lastIndexOf('}');
  if (jsonStart === -1 || jsonEnd === -1 || jsonEnd <= jsonStart) throw new Error('No valid JSON object found');
  let jsonString = text.substring(jsonStart, jsonEnd + 1);
  jsonString = jsonString.replace(/,\s*}/g, '}').replace(/,\s*]/g, ']');
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    const lastObjEnd = jsonString.lastIndexOf('},');
    if (lastObjEnd === -1) throw e;
    const fixedStr = jsonString.slice(0, lastObjEnd + 1) + '}';
    return JSON.parse(fixedStr);
  }
}
function robustParseJsonArray(text) {
  text = text.replace(/``````/g, ''); 
  const start = text.indexOf('[');
  const end = text.lastIndexOf(']');
  if (start === -1 || end === -1 || end <= start) throw new Error('No valid JSON array found');
  let jsonStr = text.slice(start, end + 1);
  
  jsonStr = jsonStr.replace(/,\s*]/g, ']').replace(/,\s*}/g, '}');
  try {
    return JSON.parse(jsonStr);
  } catch (e) {
   
    const lastObjEnd = jsonStr.lastIndexOf('},');
    if (lastObjEnd === -1) throw e;
    const fixedStr = jsonStr.slice(0, lastObjEnd + 1) + ']';
    return JSON.parse(fixedStr);
  }
}


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


async function getPredictionFromGemini(billHistory) {
  try {
    const prompt = `
You are an AI energy analyst. Based strictly on the user's monthly bill history array (see below, only use the "consumption" key), generate a 12-month energy usage prediction table and actionable insights.

Return a JSON object with:
- "predictionTable": array of objects with "month" (abbreviated, e.g., 'Jan'), "currentConsumption" (from bill history, for the months with data, otherwise null), "predictedConsumption" (estimate for each month)
- "insights": array of objects, each with "title" and "description" -- actionable, personalized and data-driven (e.g., 'Savings Trend', 'Usage Alert', 'Seasonal Adjustment', etc.)

User Bill History: ${JSON.stringify(billHistory)}

Return ONLY the JSON object in the above format.
    `;
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: { maxOutputTokens: 950, temperature: 0.7 },
    });
    let parsed;
    try {
      parsed = robustParseJsonObject(response.text);
    } catch (e) {
      console.error('Gemini prediction parse error:', e, response.text);
      throw new Error('Failed to parse prediction');
    }
    if (!parsed.predictionTable || !Array.isArray(parsed.predictionTable)) throw new Error('Missing or invalid predictionTable');
    if (!parsed.insights || !Array.isArray(parsed.insights)) throw new Error('Missing or invalid insights');
    return parsed;
  } catch (error) {
    throw new Error('Failed to generate prediction');
  }
}


async function getChatbotResponse(query, userData) {
  try {
    const { 
      appliances, 
      billHistory, 
      userProfile,
      notifications,
      energyTips,
      electricityRate = 0.15 
    } = userData;
    
    // Calculate current month consumption and costs for each appliance
    const currentMonthData = appliances?.map(appliance => {
      const monthlyKwh = appliance.monthlyUsage || (appliance.wattage * appliance.usedHoursPerDay * 30) / 1000;
      const monthlyCost = monthlyKwh * electricityRate;
      
      return {
        name: appliance.name,
        type: appliance.type,
        wattage: appliance.wattage,
        usedHoursPerDay: appliance.usedHoursPerDay,
        monthlyKwh: monthlyKwh.toFixed(2),
        monthlyCost: monthlyCost.toFixed(2)
      };
    }) || [];

    // Calculate total monthly cost and statistics
    const totalMonthlyCost = currentMonthData.reduce((sum, appliance) => sum + parseFloat(appliance.monthlyCost), 0);
    const totalMonthlyKwh = currentMonthData.reduce((sum, appliance) => sum + parseFloat(appliance.monthlyKwh), 0);
    
    // Find most and least expensive appliances
    const mostExpensiveAppliance = currentMonthData.reduce((max, appliance) => 
      parseFloat(appliance.monthlyCost) > parseFloat(max.monthlyCost || 0) ? appliance : max, {});
    
    const leastExpensiveAppliance = currentMonthData.reduce((min, appliance) => 
      parseFloat(appliance.monthlyCost) < parseFloat(min.monthlyCost || Infinity) ? appliance : min, {});

    // Calculate average daily cost and consumption
    const averageDailyCost = totalMonthlyCost / 30;
    const averageDailyKwh = totalMonthlyKwh / 30;

    // Calculate bill history statistics
    const avgMonthlyBill = billHistory?.length > 0 
      ? billHistory.reduce((sum, bill) => sum + bill.amount, 0) / billHistory.length 
      : 0;
    
    const avgMonthlyConsumption = billHistory?.length > 0 
      ? billHistory.reduce((sum, bill) => sum + bill.consumption, 0) / billHistory.length 
      : 0;

    // Sri Lankan Electricity Tax Structure and Tariff Information
    const sriLankanElectricityInfo = {
      baseRate: 0.15,
      taxStructure: {
        domesticTariff: {
          block1: { range: "0-30 kWh", rate: "LKR 2.50/kWh", usd: "$0.008/kWh" },
          block2: { range: "31-60 kWh", rate: "LKR 4.85/kWh", usd: "$0.016/kWh" },
          block3: { range: "61-90 kWh", rate: "LKR 9.85/kWh", usd: "$0.032/kWh" },
          block4: { range: "91-120 kWh", rate: "LKR 15.95/kWh", usd: "$0.052/kWh" },
          block5: { range: "121-180 kWh", rate: "LKR 27.75/kWh", usd: "$0.091/kWh" },
          block6: { range: "Above 180 kWh", rate: "LKR 32.00/kWh", usd: "$0.105/kWh" }
        },
        additionalCharges: {
          fuelAdjustment: "Variable based on fuel costs",
          distributionCharge: "LKR 30-100/month",
          vatTax: "18% on total bill",
          socialServiceContribution: "2.5% on bills above LKR 1000"
        },
        timeOfUseTariff: {
          peakHours: "6:30 PM - 10:30 PM (Higher rates)",
          offPeakHours: "10:30 PM - 5:30 AM (Lower rates)",
          dayTimeHours: "5:30 AM - 6:30 PM (Standard rates)"
        }
      },
      energyEfficiencyPrograms: {
        solarSubsidy: "Up to 80% subsidy for residential solar installations",
        energyEfficientAppliances: "Tax rebates for 5-star rated appliances",
        demandSideManagement: "Lower rates for off-peak usage"
      }
    };

    const prompt = `
You are VoltBuddy, an intelligent energy assistant and electricity expert for Sri Lanka.
User Question: "${query}"

=== USER'S COMPLETE ENERGY PROFILE ===
Personal Information:
- Name: ${userProfile?.firstName || ''} ${userProfile?.lastName || ''}
- Email: ${userProfile?.email || ''}
- Address: ${userProfile?.address || 'Not provided'}
- Contact: ${userProfile?.contactNo || 'Not provided'}
- Account Active Since: ${userProfile?.createdAt || 'Unknown'}

Current Month Energy Data:
- Total Monthly Cost: $${totalMonthlyCost.toFixed(2)} (LKR ${(totalMonthlyCost * 305).toFixed(2)})
- Total Monthly Consumption: ${totalMonthlyKwh.toFixed(2)} kWh
- Average Daily Cost: $${averageDailyCost.toFixed(2)}
- Average Daily Consumption: ${averageDailyKwh.toFixed(2)} kWh
- Number of Registered Appliances: ${currentMonthData.length}

DETAILED APPLIANCE BREAKDOWN:
${currentMonthData.map((app, index) => 
  `${index + 1}. ${app.name} (${app.type}):
     - Power Rating: ${app.wattage}W
     - Daily Usage: ${app.usedHoursPerDay} hours
     - Monthly Consumption: ${app.monthlyKwh} kWh
     - Monthly Cost: $${app.monthlyCost} (LKR ${(parseFloat(app.monthlyCost) * 305).toFixed(2)})
     - Percentage of Total Bill: ${totalMonthlyCost > 0 ? ((parseFloat(app.monthlyCost) / totalMonthlyCost) * 100).toFixed(1) : 0}%`
).join('\n')}

APPLIANCE RANKINGS:
- Most Expensive: ${mostExpensiveAppliance.name || 'None'} - $${mostExpensiveAppliance.monthlyCost || '0.00'}/month
- Least Expensive: ${leastExpensiveAppliance.name || 'None'} - $${leastExpensiveAppliance.monthlyCost || '0.00'}/month

BILL HISTORY ANALYSIS (${billHistory?.length || 0} months of data):
${billHistory?.map(bill => 
  `- ${bill.month} ${bill.year}: ${bill.consumption} kWh, $${bill.amount} (Status: ${bill.status || 'Unknown'})`
).join('\n') || 'No historical data available'}
- Average Monthly Bill: $${avgMonthlyBill.toFixed(2)}
- Average Monthly Consumption: ${avgMonthlyConsumption.toFixed(2)} kWh

RECENT NOTIFICATIONS (${notifications?.length || 0} total):
${notifications?.slice(0, 3).map(notif => 
  `- ${notif.type}: ${notif.title} (${notif.read ? 'Read' : 'Unread'})`
).join('\n') || 'No recent notifications'}

ENERGY TIPS RECEIVED (${energyTips?.length || 0} total):
${energyTips?.slice(0, 3).map(tip => 
  `- ${tip.title}: ${tip.description}`
).join('\n') || 'No energy tips available'}

=== SRI LANKAN ELECTRICITY TARIFF & TAX STRUCTURE ===
Domestic Tariff Blocks (CEB 2024):
${Object.entries(sriLankanElectricityInfo.taxStructure.domesticTariff).map(([block, info]) => 
  `- ${info.range}: ${info.rate} (${info.usd})`
).join('\n')}

Additional Charges:
- Fuel Adjustment: ${sriLankanElectricityInfo.taxStructure.additionalCharges.fuelAdjustment}
- Distribution Charge: ${sriLankanElectricityInfo.taxStructure.additionalCharges.distributionCharge}
- VAT Tax: ${sriLankanElectricityInfo.taxStructure.additionalCharges.vatTax}
- Social Service Contribution: ${sriLankanElectricityInfo.taxStructure.additionalCharges.socialServiceContribution}

Time-of-Use Tariff:
- Peak Hours: ${sriLankanElectricityInfo.taxStructure.timeOfUseTariff.peakHours}
- Off-Peak Hours: ${sriLankanElectricityInfo.taxStructure.timeOfUseTariff.offPeakHours}
- Day Time Hours: ${sriLankanElectricityInfo.taxStructure.timeOfUseTariff.dayTimeHours}

Government Energy Programs:
- Solar Subsidy: ${sriLankanElectricityInfo.energyEfficiencyPrograms.solarSubsidy}
- Appliance Rebates: ${sriLankanElectricityInfo.energyEfficiencyPrograms.energyEfficientAppliances}
- Demand Management: ${sriLankanElectricityInfo.energyEfficiencyPrograms.demandSideManagement}

=== INSTRUCTIONS ===
1. Answer the user's question using their SPECIFIC data with exact numbers
2. For general electricity/tax questions, use the Sri Lankan tariff structure
3. Provide actionable insights based on their consumption patterns
4. Include cost calculations in both USD and LKR (1 USD = 305 LKR approx)
5. Reference their specific appliances, bills, and usage patterns
6. For bill reduction advice, focus on their highest-cost appliances
7. For tax/tariff questions, explain the block system and how it affects their bill
8. Keep responses conversational, helpful, and data-driven
9. If they ask about trends, compare current data with their history
10. Always provide specific, personalized answers based on their profile

Respond as VoltBuddy with friendly expertise, using their actual data and Sri Lankan electricity context.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
      config: { maxOutputTokens: 800, temperature: 0.7 },
    });

    return response.text.trim();
  } catch (error) {
    console.error('Error getting chatbot response:', error);
    return "I'm having trouble accessing your energy data right now. Please try again in a moment, or make sure you have some appliances registered and bills logged in your account.";
  }
}

module.exports = {
  getEnergyTipsFromGemini,
  getCostStrategiesFromGemini,
  getPredictionFromGemini,
  getChatbotResponse,
};
