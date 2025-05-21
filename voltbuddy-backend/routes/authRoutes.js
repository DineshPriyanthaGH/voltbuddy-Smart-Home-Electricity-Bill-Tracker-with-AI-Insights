// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { requestOtp, verifyOtp } = require('../controllers/authControllers');  // Import the functions

// Route for sending OTP to the mobile number
router.post('/request-otp', requestOtp);  // Endpoint to request OTP

//node  Route for verifying the OTP entered by the user
router.post('/verify-otp', verifyOtp);  // Endpoint to verify OTP

module.exports = router;
