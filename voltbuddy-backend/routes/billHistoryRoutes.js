const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware'); 
const router = express.Router();

router.get('/bill-history', authMiddleware, async (req, res) => {
  const userId = req.user.id; 

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found.');

    
    const filteredBills = user.bills.filter(
      (bill) => bill.year === 2025 && ['February', 'March', 'April', 'May', 'June'].includes(bill.month)
    );

    res.json(filteredBills); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching bill history.' });
  }
});

module.exports = router;
