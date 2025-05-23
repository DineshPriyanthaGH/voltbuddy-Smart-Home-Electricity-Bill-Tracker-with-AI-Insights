const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
  getUserDashboard,
  payBill,
} = require('../controllers/dashboardController');

router.get('/', authMiddleware, getUserDashboard);
router.post('/pay', authMiddleware, payBill);

module.exports = router;
