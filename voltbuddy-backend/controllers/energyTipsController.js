// controllers/energyTipsController.js
const { getEnergyTipsFromGemini } = require('../services/geminiService');

exports.generateEnergyTips = async (req, res) => {
  try {
    // Logic for generating energy-saving tips
    const tips = await getEnergyTipsFromGemini(req.body.billHistory, req.body.applianceUsage);
    res.status(200).json({
      status: 'success',
      tips: tips,
    });
  } catch (error) {
    console.error('Error generating energy tips:', error);
    res.status(500).json({
      status: 'fail',
      message: 'Failed to generate energy-saving tips',
    });
  }
};
