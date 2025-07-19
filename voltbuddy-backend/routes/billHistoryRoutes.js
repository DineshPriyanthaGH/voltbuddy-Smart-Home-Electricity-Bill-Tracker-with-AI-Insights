const express = require('express');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/authMiddleware');
const NotificationService = require('../services/notificationService');
const { sendBillTrackingEmail } = require('../utils/emailService');
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

    // Calculate due date - 25th of NEXT month based on the billing month
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    
    const selectedMonthIndex = months.indexOf(month);
    const billingYear = parseInt(year);
    
    // Create date for the selected billing month
    const billingDate = new Date(billingYear, selectedMonthIndex, 1);
    
    // Calculate due date as 25th of the next month
    const dueDate = new Date(billingDate);
    dueDate.setMonth(dueDate.getMonth() + 1);
    dueDate.setDate(25);
    
    console.log(`✅ Bill for ${month} ${year} - Due date: ${dueDate.toLocaleDateString()} (25th of next month)`);

    // Check if bill already exists for this month/year
    const existingBill = user.bills.find(
      (bill) => bill.year === year && bill.month === month
    );

    if (existingBill) {
      // Update existing bill
      existingBill.billAmount = billAmount;
      existingBill.consumption = consumption;
      existingBill.dueDate = dueDate;
      existingBill.status = 'Pending';
      
      await user.save();
      console.log('📋 Bill updated:', existingBill);

      // Send notification for updated bill
      try {
        await NotificationService.sendBillDueNotification(req.user.id, existingBill);
      } catch (notificationError) {
        console.error('⚠️ Failed to send notification, but bill was updated:', notificationError);
      }

      // Send email notification for bill tracking
      try {
        const billDetailsForEmail = {
          month: existingBill.month,
          year: existingBill.year,
          billAmount: existingBill.billAmount,
          consumption: existingBill.consumption,
          dueDate: existingBill.dueDate,
          energyCharge: req.body.energyCharge,
          fixedCharge: req.body.fixedCharge,
          sscl: req.body.sscl
        };
        
        console.log('📧 Sending bill tracking email for updated bill...');
        await sendBillTrackingEmail(user, billDetailsForEmail);
        console.log('✅ Bill tracking email sent successfully for updated bill');
      } catch (emailError) {
        console.error('⚠️ Failed to send bill tracking email, but bill was updated:', emailError);
      }
      
      return res.json({ message: 'Bill updated successfully', updatedBill: existingBill });
    }

    // Create new bill
    const newBill = {
      month,
      year,
      billAmount,
      consumption,
      dueDate,
      status: 'Pending'
    };

    user.bills.push(newBill);
    await user.save(); 
    
    // Get the saved bill with its ID
    const savedBill = user.bills[user.bills.length - 1];

    console.log('✅ New bill added:', savedBill);

    // Send in-app notification for new bill
    try {
      await NotificationService.sendBillDueNotification(req.user.id, savedBill);
      console.log('📱 In-app notification sent successfully');
    } catch (notificationError) {
      console.error('⚠️ Failed to send notification, but bill was created:', notificationError);
    }

    // Send email notification for bill tracking
    try {
      const billDetailsForEmail = {
        month: savedBill.month,
        year: savedBill.year,
        billAmount: savedBill.billAmount,
        consumption: savedBill.consumption,
        dueDate: savedBill.dueDate,
        energyCharge: req.body.energyCharge,
        fixedCharge: req.body.fixedCharge,
        sscl: req.body.sscl
      };
      
      console.log('📧 Sending bill tracking email for new bill...');
      await sendBillTrackingEmail(user, billDetailsForEmail);
      console.log('✅ Bill tracking email sent successfully for new bill');
    } catch (emailError) {
      console.error('⚠️ Failed to send bill tracking email, but bill was created:', emailError);
    }

    res.json({ message: 'Bill added successfully', newBill: savedBill });
  } catch (error) {
    console.error('❌ Error updating the bill:', error);  
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
