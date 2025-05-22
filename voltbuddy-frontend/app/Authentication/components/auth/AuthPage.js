// AuthPage.js (Frontend React Component)

import React, { useState, useEffect } from 'react';
import { auth,  recaptchaVerifier } from './firebase';  // Import Firebase Auth and methods

export function AuthPage() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState(null); // Store Firebase confirmation result
  const [error, setError] = useState('');

  useEffect(() => {
    // Ensure reCAPTCHA is initialized when component is mounted (only in client-side)
    if (typeof window !== 'undefined' && recaptchaVerifier) {
      recaptchaVerifier.render();  // Render the invisible reCAPTCHA
    }
  }, []);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    const appVerifier = recaptchaVerifier;

    try {
      const confirmationResult = await signInWithPhoneNumber(auth, mobileNumber, appVerifier);
      setConfirmationResult(confirmationResult);  // Store confirmation result for OTP verification
      window.confirmationResult = confirmationResult;  // Store globally for OTP verification
      alert('OTP sent successfully!');
    } catch (err) {
      setError('Failed to send OTP');
      console.error(err);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    try {
      await confirmationResult.confirm(otpCode);  // Verify OTP using confirmation result
      alert('OTP verified successfully!');
      // Redirect to dashboard or other page
    } catch (err) {
      setError('Invalid OTP');
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Phone Authentication with Firebase</h2>
      <div id="recaptcha-container"></div> {/* Invisible reCAPTCHA container */}
      
      {!confirmationResult ? (
        <div>
          <input
            type="text"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}  // Update mobileNumber state
            placeholder="Enter mobile number"
          />
          <button onClick={handleSendOtp}>Send OTP</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={otpCode}
            onChange={(e) => setOtpCode(e.target.value)}  // Update otpCode state
            placeholder="Enter OTP"
          />
          <button onClick={handleVerifyOtp}>Verify OTP</button>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
