// routes/authRoutes.js
const express = require('express');
const router = express.Router();

// Import the functions from the controller
const { requestOtp, verifyOtp } = require('../controllers/authControllers');  

// Route for requesting OTP
// POST /api/auth/request-otp
router.post('/request-otp', requestOtp);  

// Route for verifying OTP
// POST /api/auth/verify-otp
router.post('/verify-otp', verifyOtp);  

module.exports = router;
