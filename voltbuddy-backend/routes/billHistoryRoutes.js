

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
      (bill) => bill.year === 2025 
      
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

  
    
    const monthIndex = new Date(Date.parse(month + " 1, 2020")).getMonth();  
    
    const dueDate = new Date(year, monthIndex, 25); 
    

    
    
    console.log("Calculated dueDate:", dueDate);

    
    
    const existingBill = user.bills.find(
      (bill) => bill.year === year && bill.month === month
    );

    if (existingBill) {
    
      
      existingBill.billAmount = billAmount;
      existingBill.consumption = consumption;
      existingBill.dueDate = dueDate;
      existingBill.status = 'Pending';
      
      await user.save();
      console.log('Bill updated:', existingBill);  
      
      return res.json({ message: 'Bill updated successfully', updatedBill: existingBill });
    }

   
    
    const newBill = {
      month,
      year,
      billAmount,
      consumption,
      dueDate,
      status: 'Pending', 
      
    };

    user.bills.push(newBill);
    await user.save(); 

    console.log('New bill added:', newBill);
    res.json({ message: 'Bill added successfully', newBill });
  } catch (error) {
    console.error('Error updating the bill:', error);  
    res.status(500).json({ message: 'Error updating the bill.' });
  }
});




router.put('/mark-paid/:billId', authMiddleware, async (req, res) => {
  const { billId } = req.params;

  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).send('User not found.');

    const bill = user.bills.id(billId); 
    if (!bill) return res.status(404).send('Bill not found.');

    bill.status = 'Paid'; 
    await user.save(); 

    res.json({ message: 'Bill marked as paid', updatedBill: bill });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error marking bill as paid.' });
  }
});

module.exports = router;
