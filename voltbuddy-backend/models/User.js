const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the schema for bill history
const billSchema = new mongoose.Schema({
  month: { type: String, required: true }, // e.g., "February", "March"
  year: { type: Number, required: true },  // e.g., 2025
  billAmount: { type: Number, required: true }, // The bill amount for the month
  dueDate: { type: Date, required: true }, // The due date of the bill
  consumption: { type: Number, required: true }, // Power consumption in kWh
});

// Define the user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  bills: [billSchema], // Array to store the user's bill history
  // Add more fields if needed, e.g. mobileNumber, preferences, etc.
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  const saltRounds = 10;
  this.password = await bcrypt.hash(this.password, saltRounds);
  next();
});

// Instance method to check password
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
