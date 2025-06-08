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
router.post('/update', authMiddleware, async (req, res) => {
  const { month, year, billAmount, consumption } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).send('User not found.');

    const dueDate = new Date(year, new Date(month).getMonth(), 25); // Calculate due date (25th of the month)
    
    const newBill = {
      month,
      year,
      billAmount,
      consumption,
      dueDate,
    };

    user.bills.push(newBill); // Add the new bill to the user
    await user.save(); // Save user with updated bill history

    res.json({ message: 'Bill updated successfully', newBill });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating the bill.' });
  }
});

// Mark a bill as paid
router.put('/mark-paid/:billId', authMiddleware, async (req, res) => {
  const { billId } = req.params;
  
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).send('User not found.');

    const bill = user.bills.id(billId); // Find the bill by its ID
    if (!bill) return res.status(404).send('Bill not found.');

    bill.status = 'Paid'; // Mark the bill as paid
    await user.save(); // Save the updated user

    res.json({ message: 'Bill marked as paid', updatedBill: bill });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error marking bill as paid.' });
  }
});

module.exports = router;
