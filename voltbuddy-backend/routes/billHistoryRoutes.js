const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware'); // Import the middleware function correctly
const router = express.Router();

// Fetch bill history from February to June 2025
router.get('/bill-history', authMiddleware, async (req, res) => {
  const userId = req.user.id;  // Access the authenticated user from the req object

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found.');

    // Filter bills from February to June 2025
    const filteredBills = user.bills.filter(
      (bill) => bill.year === 2025 && ['February', 'March', 'April', 'May', 'June'].includes(bill.month)
    );

    res.json(filteredBills);  // Respond with the filtered bill history
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching bill history.' });
  }
});

module.exports = router;
