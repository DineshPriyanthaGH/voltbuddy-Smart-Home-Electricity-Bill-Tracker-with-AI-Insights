const User = require('../models/User');
const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const { sendNotificationEmail } = require('../utils/emailService'); // see step 2 in previous answers

// Create JWT token helper
const createToken = (user) => {
  return jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' });
};

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log('📥 Register body:', req.body);

    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Uniqueness check
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create (hashing password is recommended! Use bcrypt in production)
    const newUser = new User({ username, email, password });
    await newUser.save();

    // Send welcome email
    try {
      console.log(`📧 Sending welcome email to: ${email}`);
      await sendNotificationEmail(
        email,
        'Welcome to VoltBuddy 🎉',
        `Hello ${username}, welcome to the VoltBuddy family!`,
        `<h1>Hello ${username},</h1><p>Welcome to the VoltBuddy family!</p>`
      );
      console.log('✅ Welcome email sent successfully');
    } catch (mailErr) {
      console.error("❌ Failed to send welcome email:", mailErr.message);
      console.error("Full email error:", mailErr);
      // Do not block registration if email fails
    }

    // Create welcome notification
    newUser.notifications.push({
      type: 'welcome',
      title: 'Welcome to VoltBuddy!',
      message: 'Your account is ready. Add your first bill or check out AI tips to get started.'
    });
    await newUser.save();

    // JWT token
    const token = createToken(newUser);

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

    // In production, compare with bcrypt!
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
