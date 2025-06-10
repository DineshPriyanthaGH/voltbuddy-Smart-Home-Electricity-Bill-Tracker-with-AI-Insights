const mongoose = require('mongoose');

// Schema for Bill History
const billSchema = new mongoose.Schema({
  month: { type: String, required: true },  
  year: { type: Number, required: true },   
  billAmount: { type: Number, required: true },
  dueDate: { type: Date, required: true },  
  consumption: { type: Number, required: true },  
  status: { type: String, default: "Pending" },  
});

// Schema for Appliances
const applianceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  usedHoursPerDay: { type: Number, required: true },
  powerRating: { type: Number, required: true },
  monthlyUsage: { type: Number, required: true },  
});

// Schema for Future Energy Tips (for the user)
const energyTipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, default: "" }, // Can store an icon or URL for the tip
});

// User Schema (main schema)
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  bills: [billSchema],  // Store user's bill history
  appliances: [applianceSchema],  // Store user's appliances and usage data
  futureEnergyTips: [energyTipSchema],  // Store future energy-saving tips
});

// Method to compare password (for login)
userSchema.methods.comparePassword = function(candidatePassword) {
  return this.password === candidatePassword;
};

module.exports = mongoose.model('User', userSchema);
