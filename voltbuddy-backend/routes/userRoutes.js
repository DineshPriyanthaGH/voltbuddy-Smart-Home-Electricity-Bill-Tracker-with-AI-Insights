const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware/authMiddleware'); // <-- FIXED
const { 
  getProfile, 
  updateProfile, 
  saveUserData, 
  getUserData, 
  updateUser,
  getNotifications, markNotificationRead
} = require('../controllers/userController');

// Route to get notifications (in-app) (requires authentication)
router.get('/notifications', authMiddleware, getNotifications); 
// Route to mark a notification as read (requires authentication)
router.post('/notifications/read', authMiddleware, markNotificationRead);
// Route to get user profile (requires authentication)
router.get('/profile', authMiddleware, getProfile);

// Route to update user profile (username, address, contactNo) (requires authentication)
router.put('/profile', authMiddleware, updateProfile);

// Route to save bill history and appliance usage, and generate energy-saving tips (requires authentication)
router.post('/save', authMiddleware, saveUserData);

// Route to get saved user data (bill history, appliance usage, and energy-saving tips) (requires authentication)
router.get('/data', authMiddleware, getUserData);

// Placeholder for updating user (not yet implemented)
router.put('/update', authMiddleware, updateUser);

module.exports = router;
