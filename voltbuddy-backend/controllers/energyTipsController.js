// controllers/energyTipsController.js
const { getEnergyTipsFromGemini } = require('../services/geminiService');

exports.generateEnergyTips = async (req, res) => {
  try {
    const { billHistory, applianceUsage } = req.body;

    if (!billHistory || !applianceUsage) {
      return res.status(400).json({ status: 'fail', message: 'billHistory and applianceUsage are required' });
    }

    const tips = await getEnergyTipsFromGemini(billHistory, applianceUsage);

    res.status(200).json({
      status: 'success',
      tips: tips, // Array of { title, description, learnMore }
    });
  } catch (error) {
    console.error('Error generating energy tips:', error);
    res.status(500).json({
      status: 'fail',
      message: 'Failed to generate energy-saving tips',
    });
  }
};
