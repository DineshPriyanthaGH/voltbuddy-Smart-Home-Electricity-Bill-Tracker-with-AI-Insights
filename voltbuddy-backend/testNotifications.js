// Test script to verify notification system
const NotificationService = require('./services/notificationService');
const User = require('./models/User');
const mongoose = require('mongoose');

require('dotenv').config();

async function testNotificationSystem() {
  try {
    console.log('🧪 Testing Notification System...');
    
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to database');

    // Find a test user
    const testUser = await User.findOne({});
    if (!testUser) {
      console.log('❌ No test user found');
      return;
    }
    
    console.log(`👤 Testing with user: ${testUser.username}`);

    // Test adding a bill notification
    const billData = {
      _id: 'test123',
      month: 'December',
      year: 2024,
      billAmount: 1500,
      consumption: 450,
      dueDate: new Date('2025-01-25'),
      status: 'Pending'
    };

    await NotificationService.sendBillDueNotification(testUser._id, billData);
    console.log('✅ Bill due notification sent');

    // Test email reminder (if needed)
    // await NotificationService.sendUnpaidBillEmailReminder(testUser._id, billData);
    // console.log('✅ Email reminder sent');

    // Fetch notifications
    const notifications = await NotificationService.getUserNotifications(testUser._id);
    console.log(`📱 User has ${notifications.length} notifications:`);
    notifications.forEach(notification => {
      console.log(`  - ${notification.title}: ${notification.message}`);
    });

    console.log('🎉 Notification system test completed successfully!');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('📊 Database disconnected');
  }
}

testNotificationSystem();
