const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET; // use env var in production

// Create JWT token helper
const createToken = (user) => {
  return jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Log incoming data (for debugging)
    console.log('📥 Register body:', req.body);

    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Check for existing user
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create and save new user
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Create JWT token
    const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '7d' });

    // Success response
    res.status(201).json({
      status: 'success',
      data: {
        userId: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
      token,
    });
  } catch (err) {
    console.error('❌ Register error:', err); // full error log for debugging
    res.status(400).json({
      status: 'fail',
      message: err.message || 'Registration failed',
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Please provide email and password' });

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

   
    const token = createToken(user);

    res.status(200).json({
      status: 'success',
      data: { userId: user._id, username: user.username, email: user.email },
      token,
    });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
