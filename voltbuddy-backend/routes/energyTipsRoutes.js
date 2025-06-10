// routes/energyTipsRoutes.js
const express = require('express');
const { generateEnergyTips } = require('../controllers/energyTipsController');
const router = express.Router();

// Route to generate energy-saving tips (requires authentication)
router.post('/', generateEnergyTips);

module.exports = router;
