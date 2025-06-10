// billHistoryRoutes.js
const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Get the bill history of a user
router.get('/bill-history', authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send('User not found.');

    // Get bills for the current year
    const filteredBills = user.bills.filter(
      (bill) => bill.year === 2025 // Example for filtering by year
    );

    res.json(filteredBills);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error fetching bill history.' });
  }
});

// Update a bill (Calculate and store the new bill in the database)

// Update a bill (Calculate and store the new bill in the database)
router.post('/update', authMiddleware, async (req, res) => {
  const { month, year, billAmount, consumption } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).send('User not found.');

    // Create a valid Date object for the month and year
    const monthIndex = new Date(Date.parse(month + " 1, 2020")).getMonth();  // Converts month name to month index (0 for Jan, 11 for Dec)
    const dueDate = new Date(year, monthIndex, 25); // Set due date to the 25th of the given month

    // Log the calculated dueDate for debugging
    console.log("Calculated dueDate:", dueDate);

    // Check if the bill already exists for the given month and year
    const existingBill = user.bills.find(
      (bill) => bill.year === year && bill.month === month
    );

    if (existingBill) {
      // Update the existing bill
      existingBill.billAmount = billAmount;
      existingBill.consumption = consumption;
      existingBill.dueDate = dueDate;
      existingBill.status = 'Pending'; // Reset status to Pending
      await user.save();
      console.log('Bill updated:', existingBill);  // Log the updated bill
      return res.json({ message: 'Bill updated successfully', updatedBill: existingBill });
    }

    // If the bill does not exist, create a new one
    const newBill = {
      month,
      year,
      billAmount,
      consumption,
      dueDate,
      status: 'Pending',  // Set status as 'Pending' initially
    };

    user.bills.push(newBill); // Add the new bill to the user's bills
    await user.save(); // Save the updated user

    console.log('New bill added:', newBill);  // Log the newly added bill
    res.json({ message: 'Bill added successfully', newBill });
  } catch (error) {
    console.error('Error updating the bill:', error);  // Log the full error for debugging
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
