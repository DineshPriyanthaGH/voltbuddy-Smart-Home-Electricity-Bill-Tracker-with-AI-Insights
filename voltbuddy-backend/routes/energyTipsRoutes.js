const express = require('express');
const { generateEnergyTips, generateCostStrategies,generatePredictions } = require('../controllers/energyTipsController');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware');

router.post('/', generateEnergyTips);
router.post('/cost-strategies', generateCostStrategies);
router.post('/predictions', authMiddleware, generatePredictions);

module.exports = router;
