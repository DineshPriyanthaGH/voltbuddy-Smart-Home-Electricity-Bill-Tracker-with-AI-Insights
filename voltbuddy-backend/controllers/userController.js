const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET;
const { getEnergyTipsFromGemini } = require('../services/geminiService');  // Assuming a service for Gemini integration

// Get user profile
exports.getProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
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

// Update user profile (username, address, contactNo)
exports.updateProfile = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET);

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

// Save user data (bill history, appliance usage) and generate future energy-saving tips
// controllers/userController.js
// Save user data (bill history, appliance usage) and generate future energy-saving tips
exports.saveUserData = async (req, res) => {
  const { userId, billHistory, applianceUsage } = req.body;

  try {
    // Find user or create a new user
    let user = await User.findById(userId);
    if (!user) {
      user = new User({ _id: userId, billHistory, applianceUsage });
    } else {
      // Update the existing user with the new bill history and appliance usage
      user.billHistory = billHistory;
      user.applianceUsage = applianceUsage;
    }

    // Save the user data in the database
    await user.save();

    // Call Gemini API to regenerate energy-saving tips based on updated data
    const futureTips = await getEnergyTipsFromGemini(billHistory, applianceUsage);

    // Store the regenerated future tips in the user's profile
    user.futureEnergyTips = futureTips;
    await user.save();  // Save the updated user with new energy-saving tips

    // Respond with success and the newly generated tips
    res.status(200).json({ status: 'success', tips: futureTips });
  } catch (err) {
    console.error('Error saving user data:', err);
    res.status(500).json({ status: 'fail', message: 'Failed to save data' });
  }
};


// Get saved user data (bill history, appliance usage, and energy-saving tips)
 exports.getUserData = async (req, res) => {
  const { userId } = req.query;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: 'User data not found' });
    }

    res.status(200).json({
      billHistory: user.billHistory,
      applianceUsage: user.applianceUsage,
      futureEnergyTips: user.futureEnergyTips,  // Return the future energy-saving tips
    });
  } catch (err) {
    console.error('Error retrieving user data:', err);
    res.status(500).json({ status: 'fail', message: 'Failed to retrieve data' });
  }
};

// Placeholder update user function (not yet implemented)
exports.updateUser = async (req, res) => {
  res.status(501).json({ status: 'fail', message: 'Not implemented' });
};
