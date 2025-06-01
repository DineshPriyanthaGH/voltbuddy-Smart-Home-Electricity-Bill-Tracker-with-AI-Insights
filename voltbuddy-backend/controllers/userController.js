const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET;

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Extract token
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ status: 'fail', message: 'User not found' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        username: user.username,
        email: user.email,
        address: user.address || '',
        contactNo: user.contactNo || '',
      },
    });
  } catch (err) {
    console.error("Error loading profile:", err);
    res.status(500).json({ status: 'fail', message: 'Failed to load profile' });
  }
};

// Update user profile
exports.updateProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

    // Whitelist fields allowed to update
    const updates = {};
    if (req.body.username) updates.username = req.body.username;
    if (req.body.address) updates.address = req.body.address;
    if (req.body.contactNo) updates.contactNo = req.body.contactNo;

    const user = await User.findByIdAndUpdate(decoded.userId, updates, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ status: 'fail', message: 'User not found' });
    }

    res.status(200).json({
      status: 'success',
      data: {
        username: user.username,
        email: user.email,
        address: user.address || '',
        contactNo: user.contactNo || '',
      },
    });
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ status: 'fail', message: 'Failed to update profile' });
  }
};

// Optional: Placeholder for updateUser, remove if unused
exports.updateUser = async (req, res) => {
  res.status(501).json({ status: 'fail', message: 'Not implemented' });
};
