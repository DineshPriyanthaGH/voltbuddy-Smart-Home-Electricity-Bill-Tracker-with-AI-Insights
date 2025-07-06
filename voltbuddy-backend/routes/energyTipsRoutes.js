// routes/energyTipsRoutes.js
const express = require('express');
const { generateEnergyTips } = require('../controllers/energyTipsController');
const router = express.Router();

// Route to generate energy-saving tips
router.post('/', generateEnergyTips);

module.exports = router;
