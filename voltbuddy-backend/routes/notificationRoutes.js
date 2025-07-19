const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const NotificationService = require('../services/notificationService');
const router = express.Router();

// Get user notifications
router.get('/', authMiddleware, async (req, res) => {
  try {
    const { limit = 10 } = req.query;
    const notifications = await NotificationService.getUserNotifications(req.user.id, parseInt(limit));
    
    res.json({
      success: true,
      notifications,
      count: notifications.length
    });
  } catch (error) {
    console.error('❌ Error fetching notifications:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching notifications',
      error: error.message
    });
  }
});

// Mark notification as read
router.put('/:notificationId/read', authMiddleware, async (req, res) => {
  try {
    const { notificationId } = req.params;
    console.log(`📤 Request to mark notification as read: ${notificationId} for user: ${req.user.id}`);
    
    const notification = await NotificationService.markNotificationAsRead(req.user.id, notificationId);
    
    res.json({
      success: true,
      message: 'Notification marked as read',
      notification
    });
  } catch (error) {
    console.error('❌ Error marking notification as read:', error);
    
    // Provide more specific error status codes
    const statusCode = error.message === 'User not found' ? 404 :
                      error.message === 'Notification not found' ? 404 : 500;
    
    res.status(statusCode).json({
      success: false,
      message: 'Error marking notification as read',
      error: error.message
    });
  }
});

// Manual trigger for unpaid bill reminders (for testing)
router.post('/check-unpaid-bills', authMiddleware, async (req, res) => {
  try {
    const remindersSent = await NotificationService.checkAndSendUnpaidBillReminders();
    
    res.json({
      success: true,
      message: `Checked unpaid bills and sent ${remindersSent} reminders`,
      remindersSent
    });
  } catch (error) {
    console.error('❌ Error checking unpaid bills:', error);
    res.status(500).json({
      success: false,
      message: 'Error checking unpaid bills',
      error: error.message
    });
  }
});

// Add a test notification (for development)
router.post('/test', authMiddleware, async (req, res) => {
  try {
    const { type, title, message } = req.body;
    
    const notification = await NotificationService.addNotification(
      req.user.id,
      type || 'system',
      title || 'Test Notification',
      message || 'This is a test notification from VoltBuddy'
    );
    
    res.json({
      success: true,
      message: 'Test notification added',
      notification
    });
  } catch (error) {
    console.error('❌ Error adding test notification:', error);
    res.status(500).json({
      success: false,
      message: 'Error adding test notification',
      error: error.message
    });
  }
});

// Add a test bill notification (for development)
router.post('/test-bill', authMiddleware, async (req, res) => {
  try {
    const testBill = {
      _id: 'test-bill-' + Date.now(),
      month: 'July',
      year: 2025,
      billAmount: 1500.50,
      consumption: 450,
      dueDate: new Date('2025-08-25'),
      status: 'Pending'
    };
    
    await NotificationService.sendBillDueNotification(req.user.id, testBill);
    
    res.json({
      success: true,
      message: 'Test bill notification sent',
      testBill
    });
  } catch (error) {
    console.error('❌ Error sending test bill notification:', error);
    res.status(500).json({
      success: false,
      message: 'Error sending test bill notification',
      error: error.message
    });
  }
});

module.exports = router;
