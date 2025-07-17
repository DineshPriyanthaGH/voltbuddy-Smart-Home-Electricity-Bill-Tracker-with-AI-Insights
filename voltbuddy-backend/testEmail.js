require('dotenv').config();
const { sendNotificationEmail } = require('./utils/emailService');

async function testEmail() {
  try {
    console.log('🧪 Testing email configuration...');
    console.log('SMTP_HOST:', process.env.SMTP_HOST);
    console.log('SMTP_PORT:', process.env.SMTP_PORT);
    console.log('SMTP_USER:', process.env.SMTP_USER);
    console.log('SMTP_PASS:', process.env.SMTP_PASS ? '***' + process.env.SMTP_PASS.slice(-4) : 'NOT SET');
    
    await sendNotificationEmail(
      'dineshpriyantha200248@gmail.com', // Test email to yourself
      'VoltBuddy Email Test 🧪',
      'This is a test email from VoltBuddy.',
      '<h1>Test Email</h1><p>This is a test email from VoltBuddy.</p>'
    );
    
    console.log('✅ Test email sent successfully!');
  } catch (error) {
    console.error('❌ Test email failed:', error);
  }
}

testEmail();
