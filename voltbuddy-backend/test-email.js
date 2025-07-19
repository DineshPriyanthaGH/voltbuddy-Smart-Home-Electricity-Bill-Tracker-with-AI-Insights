// Simple email test script
const { sendProfileUpdateEmail } = require('./utils/emailService');

async function testEmail() {
  try {
    console.log('🧪 Starting email test...');
    
    const testUser = {
      email: 'dineshpriyantha200248@gmail.com', // Use the same email for testing
      firstName: 'Test',
      lastName: 'User'
    };
    
    const testChanges = {
      firstName: 'Updated Test Name',
      lastName: 'Updated Last Name',
      email: 'Email was changed for testing'
    };
    
    console.log('📧 Sending test email to:', testUser.email);
    await sendProfileUpdateEmail(testUser, testChanges);
    console.log('✅ Test email sent successfully!');
    
  } catch (error) {
    console.error('❌ Email test failed:', error);
    console.error('Full error details:', error.message);
  }
}

testEmail();
