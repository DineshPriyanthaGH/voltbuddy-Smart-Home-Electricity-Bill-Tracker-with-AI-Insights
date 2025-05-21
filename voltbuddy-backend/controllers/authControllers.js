// controllers/authController.js
const { auth } = require('../firebase');  // Import Firebase Admin SDK

// Step 1: Request OTP (Sent via Firebase on the frontend)
exports.requestOtp = async (req, res) => {
  const { mobileNumber } = req.body;

  try {
    // Send OTP using Firebase Authentication (triggered on frontend, not backend)
    // Here, we just assume the OTP is sent via Firebase's SDK
    res.status(200).json({ message: 'OTP sent successfully. Please check your phone.' });
  } catch (err) {
    console.error('Error sending OTP:', err);
    res.status(500).json({ message: 'Failed to send OTP' });
  }
};

// Step 2: Verify OTP (Called when user enters OTP on the frontend)
exports.verifyOtp = async (req, res) => {
  const { mobileNumber, otpCode, verificationId } = req.body;  // verificationId is the ID returned by Firebase on frontend

  try {
    // Use Firebase Admin SDK to verify OTP
    const verificationResult = await auth.verifyIdToken(verificationId); // This should be handled in frontend

    if (verificationResult) {
      res.status(200).json({ message: 'OTP verified successfully', token: 'JWT-TOKEN-HERE' });
    } else {
      res.status(400).json({ message: 'Invalid OTP' });
    }
  } catch (err) {
    console.error('Error verifying OTP:', err);
    res.status(500).json({ message: 'Failed to verify OTP' });
  }
};
