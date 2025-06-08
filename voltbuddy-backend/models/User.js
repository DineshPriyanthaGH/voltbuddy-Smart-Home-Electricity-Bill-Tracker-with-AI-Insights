const mongoose = require('mongoose');

// Define the schema for bill history
const billSchema = new mongoose.Schema({
  month: { type: String, required: true },  // e.g., "February", "March"
  year: { type: Number, required: true },   // e.g., 2025
  billAmount: { type: Number, required: true },
  dueDate: { type: Date, required: true },  // The due date of the bill
  consumption: { type: Number, required: true },  // Power consumption in kWh
  status: { type: String, default: "Pending" },  // Bill status
});

// Define the schema for appliances
const applianceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  usedHoursPerDay: { type: Number, required: true },
  powerRating: { type: Number, required: true },
  monthlyUsage: { type: Number, required: true },  // in kWh
});
// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },  // Plain text password (no hashing)
  bills: [billSchema],  // Array to store the user's bill history
  appliances: [applianceSchema],  // Array to store the user's appliances
});

// Instance method to check password (plain text comparison)
userSchema.methods.comparePassword = function(candidatePassword) {
  return this.password === candidatePassword;  // Compare plain text passwords
};

module.exports = mongoose.model('User', userSchema);
