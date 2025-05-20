const twilio = require('twilio');

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);
const VERIFY_SERVICE_SID = process.env.TWILIO_VERIFY_SERVICE_SID;

/**
 * Send OTP to the user's mobile number using Twilio Verify API
 * @param {string} to - The recipient's mobile number
 * @param {string} locale - The preferred locale (default: 'en')
 * @returns {Promise<Object>} - Twilio API response
 */

