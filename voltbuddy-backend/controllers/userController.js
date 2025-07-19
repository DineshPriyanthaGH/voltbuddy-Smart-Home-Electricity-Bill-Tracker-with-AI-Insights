const User = require('../models/User');
const { getEnergyTipsFromGemini } = require('../services/geminiService');

// Get user profile (require auth, just use req.user from authMiddleware)
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
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
    const updates = {};
    if (req.body.username) updates.username = req.body.username;
    if (req.body.address) updates.address = req.body.address;
    if (req.body.contactNo) updates.contactNo = req.body.contactNo;

    const user = await User.findByIdAndUpdate(req.user._id, updates, {
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

// Fetch all notifications (in-app)
exports.getNotifications = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('notifications');
    res.status(200).json({ notifications: user.notifications.slice().reverse() });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching notifications' });
  }
};

// Mark notification as read
exports.markNotificationRead = async (req, res) => {
  try {
    const { notifId } = req.body;
    await User.updateOne(
      { _id: req.user._id, "notifications._id": notifId },
      { $set: { "notifications.$.read": true } }
    );
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ message: 'Error marking notification as read' });
  }
};

// Save user data (billHistory, applianceUsage) and generate future energy tips
exports.saveUserData = async (req, res) => {
  const { billHistory, applianceUsage } = req.body;
  // billHistory should be an array matching your User.bills
  try {
    // Find the user
    let user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ status: 'fail', message: 'User not found' });

    // Replace bill history and appliance usage (syncing with your model)
    user.bills = billHistory;
    user.appliances = applianceUsage;
    await user.save();

    // Generate energy-saving tips
    const futureTips = await getEnergyTipsFromGemini(billHistory, applianceUsage);

    // Store the generated tips
    user.futureEnergyTips = futureTips;
    await user.save();

    res.status(200).json({ status: 'success', tips: futureTips });
  } catch (err) {
    console.error('Error saving user data:', err);
    res.status(500).json({ status: 'fail', message: 'Failed to save data' });
  }
};

// Get user data (bill history, appliances, future tips)
exports.getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: 'User data not found' });
    }
    res.status(200).json({
      billHistory: user.bills,
      applianceUsage: user.appliances,
      futureEnergyTips: user.futureEnergyTips,
    });
  } catch (err) {
    console.error('Error retrieving user data:', err);
    res.status(500).json({ status: 'fail', message: 'Failed to retrieve data' });
  }
};

// (Optional) Placeholder for update user endpoint
exports.updateUser = async (req, res) => {
  res.status(501).json({ status: 'fail', message: 'Not implemented' });
};
