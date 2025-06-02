const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust the path if needed

mongoose.connect('mongodb+srv://voltbuddyUser:200209902463@cluster1.opudjte.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedUsers = async () => {
  // Find the user by email and update their bills if the user exists
  const user = await User.findOneAndUpdate(
    { email: 'test4@example.com' },  // Find user by email
    { $set: { 
      bills: [
        { month: 'February', year: 2025, billAmount: 1200, dueDate: new Date('2025-02-28'), consumption: 350 },
        { month: 'March', year: 2025, billAmount: 1300, dueDate: new Date('2025-03-31'), consumption: 400 },
        { month: 'April', year: 2025, billAmount: 1400, dueDate: new Date('2025-04-30'), consumption: 450 },
        { month: 'May', year: 2025, billAmount: 1500, dueDate: new Date('2025-05-31'), consumption: 500 },
        { month: 'June', year: 2025, billAmount: 1600, dueDate: new Date('2025-06-30'), consumption: 550 },
      ]
    }},
    { new: true } // Return the updated document
  );

  if (!user) {
    console.log('User not found, creating new user');
    // If no user is found, create a new one with username, email, password and bill data
    await User.create({
      username: 'test4',
      email: 'test4@example.com',
      password: 'Test4', // Ensure password is hashed
      bills: [
        { month: 'February', year: 2025, billAmount: 1200, dueDate: new Date('2025-02-28'), consumption: 350 },
        { month: 'March', year: 2025, billAmount: 1300, dueDate: new Date('2025-03-31'), consumption: 400 },
        { month: 'April', year: 2025, billAmount: 1400, dueDate: new Date('2025-04-30'), consumption: 450 },
        { month: 'May', year: 2025, billAmount: 1500, dueDate: new Date('2025-05-31'), consumption: 500 },
        { month: 'June', year: 2025, billAmount: 1600, dueDate: new Date('2025-06-30'), consumption: 550 },
      ]
    });
    console.log('New user created and bill histories added');
  } else {
    console.log('User found and updated');
  }

 
};

seedUsers().catch((error) => console.error(error));
