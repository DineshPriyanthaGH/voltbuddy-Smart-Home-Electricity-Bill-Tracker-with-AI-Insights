const jwt = require('jsonwebtoken');
const User = require('../models/User');  // User model for storing user data
const { sendOtp, verifyOtp } = require('../services/smsService');  

exports.requestOtp = async (req, res) => {
  const { mobileNumber } = req.body;

  try {
    // Validate the mobile number format (Sri Lankan format)
    if (!/^(?:\+94|0)?[0-9]{9}$/.test(mobileNumber)) {
      return res.status(400).json({ message: 'Invalid mobile number' });
    }

    // Send OTP using Twilio service
    await sendOtp(mobileNumber);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

