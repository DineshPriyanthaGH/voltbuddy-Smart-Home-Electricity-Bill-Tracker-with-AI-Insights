// models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  mobileNumber: {
    type: String,
    required: true,
    unique: true,
    match: [/^(?:\+94|0)?[0-9]{9}$/, 'Invalid Sri Lankan mobile number format']
  },
  appliances: [
    {
      name: { type: String },
      usage_kwh: { type: Number },
      power_rating: { type: Number },
    }
  ],
  billHistory: [
    {
      amount: { type: Number },
      dueDate: { type: Date },
      usageUnits: { type: Number },
      billDate: { type: Date, default: Date.now },
    }
  ],
  insights: [
    {
      tip: { type: String },
      generatedAt: { type: Date, default: Date.now }
    }
  ],
  reminders: [
    {
      message: { type: String },
      notifyAt: { type: Date }
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('User', UserSchema);
