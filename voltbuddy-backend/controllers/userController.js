const User = require('../models/User');
const { getEnergyTipsFromGemini } = require('../services/geminiService');
const { sendProfileUpdateEmail } = require('../utils/emailService');

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
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        profileImage: user.profileImage || '',
        dateOfBirth: user.dateOfBirth || null,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLoginAt: user.lastLoginAt,
        emailVerified: user.emailVerified,
        isActive: user.isActive
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
    const allowedUpdates = ['username', 'address', 'contactNo', 'firstName', 'lastName', 'dateOfBirth', 'profileImage'];
    
    // Only include allowed fields in updates
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    // Get the current user for comparison
    const currentUser = await User.findById(req.user._id);
    if (!currentUser) {
      return res.status(404).json({ status: 'fail', message: 'User not found' });
    }

    // Update the user
    const user = await User.findByIdAndUpdate(req.user._id, updates, {
      new: true,
      runValidators: true,
    });

    // Send email notification about profile update
    try {
      console.log('🚀 About to send profile update email...');
      console.log('📧 Email details:', { email: user.email, username: user.username, updates });
      
      await sendProfileUpdateEmail(user.email, user.username, updates);
      console.log('✅ Profile update email sent successfully to:', user.email);
    } catch (emailError) {
      console.error('⚠️ Failed to send profile update email:', emailError);
      console.error('📧 Email error details:', emailError.message);
      // Don't fail the request if email fails
    }

    res.status(200).json({
      status: 'success',
      message: 'Profile updated successfully',
      data: {
        username: user.username,
        email: user.email,
        address: user.address || '',
        contactNo: user.contactNo || '',
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        profileImage: user.profileImage || '',
        dateOfBirth: user.dateOfBirth || null,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        lastLoginAt: user.lastLoginAt,
        emailVerified: user.emailVerified,
        isActive: user.isActive
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
