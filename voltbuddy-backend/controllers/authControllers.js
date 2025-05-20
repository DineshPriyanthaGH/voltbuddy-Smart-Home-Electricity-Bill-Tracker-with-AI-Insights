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
exports.verifyOtp = async (req, res) => {
  const { mobileNumber, otpCode } = req.body;

  try {
    // Verify OTP using Twilio service
    const isVerified = await verifyOtp(mobileNumber, otpCode);

    if (isVerified) {
      // OTP is valid, check if the user exists or create a new one
      let user = await User.findOne({ mobileNumber });
      if (!user) {
        user = await User.create({ mobileNumber });  // Create new user if doesn't exist
      }

      // Generate JWT token for authenticated user
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.status(200).json({ message: 'OTP verified successfully', token });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
};
exports.verifyOtp = async (req, res) => {
  const { mobileNumber, otpCode } = req.body;

  try {
    // Verify OTP using Twilio service
    const isVerified = await verifyOtp(mobileNumber, otpCode);

    if (isVerified) {
      // OTP is valid, check if the user exists or create a new one
      let user = await User.findOne({ mobileNumber });
      if (!user) {
        user = await User.create({ mobileNumber });  // Create new user if doesn't exist
      }

      // Generate JWT token for authenticated user
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
      res.status(200).json({ message: 'OTP verified successfully', token });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
};

