const jwt = require('jsonwebtoken');
const User = require('../models/User');
const OtpSession = require('../models/OtpSession');
const sendSms = require('../services/smsService');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// Request OTP - send OTP to user mobile
exports.requestOtp = async (req, res) => {
  const { mobileNumber } = req.body;

  if (!/^(?:\+94|0)?[0-9]{9}$/.test(mobileNumber)) {
    return res.status(400).json({ message: 'Invalid mobile number' });
  }

  try {
    // Generate 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry

    // Remove previous OTPs for this number
    await OtpSession.deleteMany({ mobileNumber });

    // Save OTP session
    await new OtpSession({ mobileNumber, otpCode, expiresAt }).save();

    // Send OTP SMS
    await sendSms(mobileNumber, `Your VoltBuddy OTP is: ${otpCode}`);

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

// Verify OTP - validate OTP and login/create user
exports.verifyOtp = async (req, res) => {
  const { mobileNumber, otpCode } = req.body;

  try {
    const otpSession = await OtpSession.findOne({ mobileNumber, otpCode });
    if (!otpSession) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }

    if (otpSession.expiresAt < new Date()) {
      return res.status(400).json({ message: 'OTP expired' });
    }

    // Delete OTP so it can't be reused
    await OtpSession.deleteMany({ mobileNumber });

    // Find or create user
    let user = await User.findOne({ mobileNumber });
    if (!user) {
      user = await User.create({ mobileNumber });
    }

    // Generate JWT token
    const token = generateToken(user._id);
    res.status(200).json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get logged-in user profile
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
