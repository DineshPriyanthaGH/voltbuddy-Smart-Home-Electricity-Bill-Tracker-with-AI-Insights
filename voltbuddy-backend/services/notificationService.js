const User = require('../models/User');
const { sendNotificationEmail } = require('../utils/emailService');

class NotificationService {
  
  // Add in-app notification to user
  static async addNotification(userId, type, title, message, data = {}) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const notification = {
        type,
        title,
        message,
        data,
        read: false,
        createdAt: new Date()
      };

      user.notifications.push(notification);
      await user.save();
      
      console.log(`✅ In-app notification added for user ${userId}: ${title}`);
      return notification;
    } catch (error) {
      console.error('❌ Error adding notification:', error);
      throw error;
    }
  }

  // Send bill due notification
  static async sendBillDueNotification(userId, billDetails) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const dueDate = new Date(billDetails.dueDate);
      const formattedDueDate = dueDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      // Add in-app notification
      await this.addNotification(
        userId,
        'bill_due',
        'New Bill Calculated',
        `Your ${billDetails.month} ${billDetails.year} electricity bill has been calculated. Amount: LKR ${billDetails.billAmount.toFixed(2)}. Due date: ${formattedDueDate}`,
        { 
          billId: billDetails._id,
          amount: billDetails.billAmount,
          dueDate: billDetails.dueDate,
          month: billDetails.month,
          year: billDetails.year
        }
      );

      console.log(`📢 Bill due notification sent for user ${userId}`);
      return true;
    } catch (error) {
      console.error('❌ Error sending bill due notification:', error);
      throw error;
    }
  }

  // Send email reminder for unpaid bills
  static async sendUnpaidBillEmailReminder(userId, billDetails) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      const dueDate = new Date(billDetails.dueDate);
      const formattedDueDate = dueDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const emailSubject = `⚠️ VoltBuddy: Unpaid Bill Reminder - ${billDetails.month} ${billDetails.year}`;
      
      const emailText = `
Dear ${user.username},

This is a reminder that your electricity bill for ${billDetails.month} ${billDetails.year} is still unpaid.

Bill Details:
- Amount: LKR ${billDetails.billAmount.toFixed(2)}
- Due Date: ${formattedDueDate}
- Consumption: ${billDetails.consumption} kWh
- Status: ${billDetails.status}

Please make your payment as soon as possible to avoid any service interruptions.

You can pay online at: https://payment.ceb.lk/instantpay

Best regards,
VoltBuddy Team
      `;

      const emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(to right, #2441E1, #3B82F6); color: white; padding: 20px; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
        .bill-details { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
        .amount { font-size: 24px; font-weight: bold; color: #e74c3c; }
        .button { background: linear-gradient(to right, #2441E1, #3B82F6); color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>💡 VoltBuddy Bill Reminder</h1>
        </div>
        <div class="content">
            <p>Dear <strong>${user.username}</strong>,</p>
            
            <p>This is a reminder that your electricity bill for <strong>${billDetails.month} ${billDetails.year}</strong> is still unpaid.</p>
            
            <div class="bill-details">
                <h3>📋 Bill Details</h3>
                <p><strong>Amount:</strong> <span class="amount">LKR ${billDetails.billAmount.toFixed(2)}</span></p>
                <p><strong>Due Date:</strong> ${formattedDueDate}</p>
                <p><strong>Consumption:</strong> ${billDetails.consumption} kWh</p>
                <p><strong>Status:</strong> <span style="color: #e74c3c;">${billDetails.status}</span></p>
            </div>
            
            <p>Please make your payment as soon as possible to avoid any service interruptions.</p>
            
            <a href="https://payment.ceb.lk/instantpay" class="button">Pay Now Online</a>
            
            <p style="margin-top: 20px; font-size: 14px; color: #666;">
                If you have already paid this bill, please ignore this reminder or mark it as paid in your VoltBuddy dashboard.
            </p>
            
            <p>Best regards,<br><strong>VoltBuddy Team</strong></p>
        </div>
    </div>
</body>
</html>
      `;

      // Send email
      await sendNotificationEmail(user.email, emailSubject, emailText, emailHtml);
      
      // Add in-app notification about email reminder
      await this.addNotification(
        userId,
        'reminder',
        'Payment Reminder Sent',
        `We've sent a payment reminder email for your ${billDetails.month} ${billDetails.year} bill (LKR ${billDetails.billAmount.toFixed(2)}) to ${user.email}`,
        { 
          billId: billDetails._id,
          emailSent: true,
          sentAt: new Date()
        }
      );

      console.log(`📧 Unpaid bill email reminder sent to ${user.email} for bill ${billDetails._id}`);
      return true;
    } catch (error) {
      console.error('❌ Error sending unpaid bill email reminder:', error);
      throw error;
    }
  }

  // Check for unpaid bills and send reminders
  static async checkAndSendUnpaidBillReminders() {
    try {
      const today = new Date();
      const currentDay = today.getDate();
      
      // Only run this check on or after the 20th of each month
      if (currentDay < 20) {
        console.log(`📅 Today is ${currentDay}th, skipping unpaid bill reminder check (runs after 20th)`);
        return;
      }

      console.log('🔍 Checking for unpaid bills that need reminders...');
      
      const users = await User.find({});
      let remindersSent = 0;

      for (const user of users) {
        for (const bill of user.bills) {
          if (bill.status === 'Pending') {
            const billDueDate = new Date(bill.dueDate);
            const daysDiff = Math.floor((today - billDueDate) / (1000 * 60 * 60 * 24));
            
            // Send reminder if bill is overdue or due within 5 days and after 20th
            if (daysDiff >= -5) {
              await this.sendUnpaidBillEmailReminder(user._id, bill);
              remindersSent++;
            }
          }
        }
      }

      console.log(`📧 Sent ${remindersSent} unpaid bill email reminders`);
      return remindersSent;
    } catch (error) {
      console.error('❌ Error checking unpaid bills:', error);
      throw error;
    }
  }

  // Get user notifications
  static async getUserNotifications(userId, limit = 10) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      // Sort notifications by creation date (newest first) and limit
      const notifications = user.notifications
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit);

      return notifications;
    } catch (error) {
      console.error('❌ Error getting user notifications:', error);
      throw error;
    }
  }

  // Mark notification as read
  static async markNotificationAsRead(userId, notificationId) {
    try {
      console.log(`🔍 Attempting to mark notification as read: userId=${userId}, notificationId=${notificationId}`);
      
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }

      console.log(`📋 User has ${user.notifications.length} total notifications`);
      
      const notification = user.notifications.id(notificationId);
      if (!notification) {
        console.log(`❌ Notification with ID ${notificationId} not found`);
        console.log(`📝 Available notification IDs:`, user.notifications.map(n => n._id.toString()));
        throw new Error('Notification not found');
      }

      notification.read = true;
      await user.save();

      console.log(`✅ Notification ${notificationId} marked as read for user ${userId}`);
      return notification;
    } catch (error) {
      console.error('❌ Error marking notification as read:', error);
      throw error;
    }
  }
}

module.exports = NotificationService;
