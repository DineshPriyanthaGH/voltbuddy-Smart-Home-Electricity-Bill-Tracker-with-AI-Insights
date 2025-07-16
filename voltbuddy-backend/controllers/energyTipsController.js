const { getEnergyTipsFromGemini, getCostStrategiesFromGemini,  getPredictionFromGemini, } = require('../services/geminiService');
const User = require('../models/User'); 
exports.generateEnergyTips = async (req, res) => {
  try {
    const { billHistory, applianceUsage } = req.body;

    if (!billHistory || !applianceUsage) {
      return res.status(400).json({ status: 'fail', message: 'billHistory and applianceUsage are required' });
    }

    const tips = await getEnergyTipsFromGemini(billHistory, applianceUsage);

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

exports.generateCostStrategies = async (req, res) => {
  try {
    const { billHistory, applianceUsage } = req.body;
    if (!billHistory || !applianceUsage) {
      return res.status(400).json({ status: 'fail', message: 'billHistory and applianceUsage are required' });
    }
    const strategies = await getCostStrategiesFromGemini(billHistory, applianceUsage);
    res.status(200).json({ status: 'success', strategies });
  } catch (error) {
    console.error('Error generating cost reduction strategies:', error);
    res.status(500).json({ status: 'fail', message: 'Failed to generate cost reduction strategies' });
  }
};

exports.generatePredictions = async (req, res) => {
  try {
    // User ID is provided by auth middleware
    if (!req.user || !req.user._id) {
      return res.status(401).json({ status: 'fail', message: 'Unauthorized' });
    }
    const user = await User.findById(req.user._id).select('bills');
    if (!user || !user.bills.length) {
      return res.status(404).json({ status: 'fail', message: 'No bill history found' });
    }

    // Use only needed fields
    const billHistory = user.bills.map(b => ({
      month: b.month,
      year: b.year,
      consumption: b.consumption,
    }));

    const prediction = await getPredictionFromGemini(billHistory);
    res.status(200).json({ status: 'success', prediction });
  } catch (error) {
    console.error('Error generating predictions:', error);
    res.status(500).json({ status: 'fail', message: 'Failed to generate predictions' });
  }
};