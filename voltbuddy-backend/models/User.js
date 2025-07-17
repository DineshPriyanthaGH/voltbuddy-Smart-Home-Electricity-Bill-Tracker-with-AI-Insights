const mongoose = require('mongoose');

// Bill History Schema
const billSchema = new mongoose.Schema({
  month: { type: String, required: true },  
  year: { type: Number, required: true },   
  billAmount: { type: Number, required: true },
  dueDate: { type: Date, required: true },  
  consumption: { type: Number, required: true },  
  status: { type: String, default: "Pending" },  
});

// Appliances Schema
const applianceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  usedHoursPerDay: { type: Number, required: true },
  powerRating: { type: Number, required: true },
  monthlyUsage: { type: Number, required: true },  
});

// Energy Tips Schema
const energyTipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: "" },
});

// Notification Schema
const notificationSchema = new mongoose.Schema({
  type: { 
    type: String, 
    enum: ['system', 'reminder', 'bill_due', 'ai-tip', 'promo', 'welcome'], 
    required: true 
  },
  title: { type: String, required: true },
  message: { type: String, required: true },
  data: { type: Object, default: {} },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

// User Schema (Main)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  bills: [billSchema],
  appliances: [applianceSchema],
  futureEnergyTips: [energyTipSchema],
  notifications: [notificationSchema]
});

// Method to compare password
userSchema.methods.comparePassword = function(candidatePassword) {
  return this.password === candidatePassword;
};

module.exports = mongoose.model('User', userSchema);
