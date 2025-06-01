const mongoose = require('mongoose');
const User = require('./models/User'); // Make sure this path is correct

mongoose.connect('mongodb+srv://voltbuddyUser:IS5knRISyBLWBf8v@cluster1.opudjte.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedUsers = async () => {
  const users = [
    {
      username: 'kasun',
      email: 'kasun@example.com',
      password: 'kasu1234', // Make sure to hash this password when saving in your registration route
      bills: [
        { month: 'February', year: 2025, billAmount: 1200, dueDate: new Date('2025-02-28'), consumption: 350 },
        { month: 'March', year: 2025, billAmount: 1300, dueDate: new Date('2025-03-31'), consumption: 400 },
        { month: 'April', year: 2025, billAmount: 1400, dueDate: new Date('2025-04-30'), consumption: 450 },
        { month: 'May', year: 2025, billAmount: 1500, dueDate: new Date('2025-05-31'), consumption: 500 },
        { month: 'June', year: 2025, billAmount: 1600, dueDate: new Date('2025-06-30'), consumption: 550 },
        { month: 'July', year: 2025, billAmount: 1700, dueDate: new Date('2025-07-31'), consumption: 600 },
     
        // Add more months as needed
      ],
    },
    {
      username: 'test1',
      email: 'test1@3example.com',
      password: 'password12345',
      bills: [
        { month: 'February', year: 2025, billAmount: 1100, dueDate: new Date('2025-02-28'), consumption: 300 },
        { month: 'March', year: 2025, billAmount: 1250, dueDate: new Date('2025-03-31'), consumption: 380 },
        { month: 'April', year: 2025, billAmount: 1350, dueDate: new Date('2025-04-30'), consumption: 420 },
        { month: 'May', year: 2025, billAmount: 1450, dueDate: new Date('2025-05-31'), consumption: 480 },
        { month: 'June', year: 2025, billAmount: 1550, dueDate: new Date('2025-06-30'), consumption: 530 },
        { month: 'July', year: 2025, billAmount: 1650, dueDate: new Date('2025-07-31'), consumption: 580 },
        // Add more months as needed
      ],
    },
    // Add other users as needed
  ];

  await User.insertMany(users);
  console.log('Users and bill histories seeded!');
};

seedUsers().catch((error) => console.error(error));
