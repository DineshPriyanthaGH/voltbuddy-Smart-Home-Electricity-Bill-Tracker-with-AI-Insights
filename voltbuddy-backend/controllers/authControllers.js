// controllers/authController.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Generate JWT Token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: '7d'
  });
};

// @desc    Register new user
// @route   POST /api/auth/register
exports.registerUser = async (req, res) => {
  const { mobileNumber } = req.body;

  try {
    // Check if already exists
    let user = await User.findOne({ mobileNumber });
    if (user) {
      return res.status(400).json({ message: 'User already registered' });
    }

    // Create new user
    user = await User.create({ mobileNumber });

    const token = generateToken(user._id);
    res.status(201).json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
exports.loginUser = async (req, res) => {
  const { mobileNumber } = req.body;

  try {
    const user = await User.findOne({ mobileNumber });

    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    const token = generateToken(user._id);
    res.status(200).json({ user, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get logged-in user profile
// @route   GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};
