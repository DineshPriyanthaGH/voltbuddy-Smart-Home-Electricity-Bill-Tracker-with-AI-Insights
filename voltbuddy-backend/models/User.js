const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  usageUnits: { type: Number, required: true },
  billDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Pending', 'Paid'], default: 'Pending' },
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  appliances: [
    {
      name: String,
      usage_kwh: Number,
      power_rating: Number,
    }
  ],
  billHistory: [billSchema],
  insights: [
    {
      tip: String,
      generatedAt: { type: Date, default: Date.now },
    }
  ],
  reminders: [
    {
      message: String,
      notifyAt: Date,
    }
  ],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);
