const mongoose = require('mongoose');

const OtpSessionSchema = new mongoose.Schema({
  mobileNumber: { type: String, required: true },
  otpCode: { type: String, required: true },
  expiresAt: { type: Date, required: true }
});

module.exports = mongoose.model('OtpSession', OtpSessionSchema);
