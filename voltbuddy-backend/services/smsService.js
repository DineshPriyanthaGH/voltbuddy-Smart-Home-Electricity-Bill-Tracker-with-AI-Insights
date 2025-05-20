const twilio = require('twilio');

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const VERIFY_SERVICE_SID = process.env.TWILIO_VERIFY_SERVICE_SID;

/**
 * Send OTP to the user's mobile number using Twilio Verify API
 * @param {string} to - The recipient's mobile number
 * @param {string} locale - The preferred locale (default: 'en')
 * @returns {Promise<Object>} - Twilio API response
 */

async function sendOtp(to, locale = 'en') {
  try {
    const verification = await client.verify
      .services(VERIFY_SERVICE_SID)
      .verifications.create({
        to,
        channel: 'sms',  // OTP will be sent via SMS
        locale,
      });

    return verification;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw new Error('Failed to send OTP');
  }
}

/**
 * Verify the OTP code entered by the user
 * @param {string} to - The recipient's mobile number
 * @param {string} code - The OTP code entered by the user
 * @returns {Promise<boolean>} - Returns true if OTP is valid
 */
async function verifyOtp(to, code) {
  try {
    const verificationCheck = await client.verify
      .services(VERIFY_SERVICE_SID)
      .verificationChecks.create({
        to,
        code,
      });

    return verificationCheck.status === 'approved';
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw new Error('Failed to verify OTP');
  }
}

module.exports = { sendOtp, verifyOtp };
