const express = require('express');
const { generateEnergyTips, generateCostStrategies } = require('../controllers/energyTipsController');
const router = express.Router();

router.post('/', generateEnergyTips);
router.post('/cost-strategies', generateCostStrategies);

module.exports = router;
