// Simple test script to check basic functionality
console.log('🧪 Starting basic test...');

// Test 1: Check if we can load the module
try {
  console.log('📁 Testing module import...');
  const emailService = require('./utils/emailService');
  console.log('✅ Email service module loaded successfully');
  
  // Test 2: Check if function exists
  if (emailService.sendProfileUpdateEmail) {
    console.log('✅ sendProfileUpdateEmail function found');
  } else {
    console.log('❌ sendProfileUpdateEmail function not found');
  }
  
} catch (error) {
  console.error('❌ Error loading email service:', error.message);
}

console.log('🏁 Basic test completed');
