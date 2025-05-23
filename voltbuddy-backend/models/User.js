// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
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
