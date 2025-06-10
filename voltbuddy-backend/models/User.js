const mongoose = require('mongoose');

//schema for bill history
const billSchema = new mongoose.Schema({
  month: { type: String, required: true },  
  year: { type: Number, required: true },   
  billAmount: { type: Number, required: true },
  dueDate: { type: Date, required: true },  
  consumption: { type: Number, required: true },  
  status: { type: String, default: "Pending" },  
});

//  schema for appliances
const applianceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  usedHoursPerDay: { type: Number, required: true },
  powerRating: { type: Number, required: true },
  monthlyUsage: { type: Number, required: true },  
});
//  user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true }, 
  bills: [billSchema],  
  appliances: [applianceSchema],  
});

userSchema.methods.comparePassword = function(candidatePassword) {
  return this.password === candidatePassword;
};

module.exports = mongoose.model('User', userSchema);
