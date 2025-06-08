const mongoose = require('mongoose');
const User = require('./models/User'); // Adjust the path if needed

mongoose.connect('mongodb+srv://voltbuddyUser:200209902463@cluster1.opudjte.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const seedUsers = async () => {
  // Update or create user test4
  const user4 = await User.findOneAndUpdate(
    { email: 'test4@example.com' },
    {
      $set: {
        bills: [
          { month: 'February', year: 2025, billAmount: 1200, dueDate: new Date('2025-03-15'), consumption: 350 },
          { month: 'March', year: 2025, billAmount: 1300, dueDate: new Date('2025-04-15'), consumption: 400 },
          { month: 'April', year: 2025, billAmount: 1400, dueDate: new Date('2025-05-15'), consumption: 450 },
          { month: 'May', year: 2025, billAmount: 1500, dueDate: new Date('2025-06-15'), consumption: 500 },
          { month: 'June', year: 2025, billAmount: 1600, dueDate: new Date('2025-07-15'), consumption: 550 },
        ],
      },
    },
    { new: true }
  );

  if (!user4) {
    console.log('User test4 not found, creating new user');
    await User.create({
      username: 'test4',
      email: 'test4@example.com',
      password: 'Test4', // Plain text or hashed depending on your model
      bills: [
        { month: 'February', year: 2025, billAmount: 1200, dueDate: new Date('2025-03-15'), consumption: 350 },
        { month: 'March', year: 2025, billAmount: 1300, dueDate: new Date('2025-04-15'), consumption: 400 },
        { month: 'April', year: 2025, billAmount: 1400, dueDate: new Date('2025-05-15'), consumption: 450 },
        { month: 'May', year: 2025, billAmount: 1500, dueDate: new Date('2025-06-15'), consumption: 500 },
        { month: 'June', year: 2025, billAmount: 1600, dueDate: new Date('2025-07-15'), consumption: 550 },
      ],
    });
    console.log('New user test4 created and bill histories added');
  } else {
    console.log('User test4 found and updated');
  }

  // Update or create user test5
  const user5 = await User.findOneAndUpdate(
    { email: 'test5@example.com' },
    {
      $set: {
        bills: [
          { month: 'February', year: 2025, billAmount: 1250, dueDate: new Date('2025-03-20'), consumption: 360 },
          { month: 'March', year: 2025, billAmount: 1000, dueDate: new Date('2025-04-20'), consumption: 320 },
          { month: 'April', year: 2025, billAmount: 1450, dueDate: new Date('2025-05-20'), consumption: 460 },
          { month: 'May', year: 2025, billAmount: 800, dueDate: new Date('2025-06-20'), consumption: 300 },
          { month: 'June', year: 2025, billAmount: 1650, dueDate: new Date('2025-07-20'), consumption: 560 },
        ],
      },
    },
    { new: true }
  );

  if (!user5) {
    console.log('User test5 not found, creating new user');
    await User.create({
      username: 'test5',
      email: 'test5@example.com',
      password: 'Test5', // Plain text or hashed depending on your model
      bills: [
        { month: 'February', year: 2025, billAmount: 1250, dueDate: new Date('2025-03-20'), consumption: 360 },
        { month: 'March', year: 2025, billAmount: 1000, dueDate: new Date('2025-04-20'), consumption: 320 },
        { month: 'April', year: 2025, billAmount: 1450, dueDate: new Date('2025-05-20'), consumption: 460 },
        { month: 'May', year: 2025, billAmount: 800, dueDate: new Date('2025-06-20'), consumption: 300 },
        { month: 'June', year: 2025, billAmount: 1650, dueDate: new Date('2025-07-20'), consumption: 560 },
      ],
    });
    console.log('New user test5 created and bill histories added');
  } else {
    console.log('User test5 found and updated');
  }
  const user7 = await User.findOneAndUpdate(
    { email: 'test7@example.com' },
    {
      $set: {
        bills: [
          { month: 'February', year: 2025, billAmount: 1100, dueDate: new Date('2025-03-25'), consumption: 340 },
          { month: 'March', year: 2025, billAmount: 600, dueDate: new Date('2025-04-25'), consumption: 360 },
          { month: 'April', year: 2025, billAmount: 1320, dueDate: new Date('2025-05-25'), consumption: 380 },
          { month: 'May', year: 2025, billAmount: 100, dueDate: new Date('2025-06-25'), consumption: 400 },
          { month: 'June', year: 2025, billAmount: 2000, dueDate: new Date('2025-07-25'), consumption: 420 },
        ],
      },
    },
    { new: true }
  );

  if (!user7) {
    console.log('User test7 not found, creating new user');
    await User.create({
      username: 'test7',
      email: 'test7@example.com',
      password: '2002', // Plain text or hashed depending on your model
      bills: [
        { month: 'February', year: 2025, billAmount: 1100, dueDate: new Date('2025-03-25'), consumption: 340 },
        { month: 'March', year: 2025, billAmount: 600, dueDate: new Date('2025-04-25'), consumption: 360 },
        { month: 'April', year: 2025, billAmount: 1320, dueDate: new Date('2025-05-25'), consumption: 380 },
        { month: 'May', year: 2025, billAmount: 100, dueDate: new Date('2025-06-25'), consumption: 400 },
        { month: 'June', year: 2025, billAmount: 2000, dueDate: new Date('2025-07-25'), consumption: 420 },
      ],
    });
    console.log('New user test7 created and bill histories added');
  } else {
    console.log('User test7 found and updated');
  }
  const user8 = await User.findOneAndUpdate(
    { email: 'test8@example.com' },
    {
      $set: {
        bills: [
          { month: 'February', year: 2025, billAmount: 1100, dueDate: new Date('2025-03-25'), consumption: 340 },
          { month: 'March', year: 2025, billAmount: 600, dueDate: new Date('2025-04-25'), consumption: 360 },
          { month: 'April', year: 2025, billAmount: 1320, dueDate: new Date('2025-05-25'), consumption: 380 },
          { month: 'May', year: 2025, billAmount: 100, dueDate: new Date('2025-06-25'), consumption: 400 },
          { month: 'June', year: 2025, billAmount: 2000, dueDate: new Date('2025-07-25'), consumption: 420 },
        ],
      },
    },
    { new: true }
  );

  if (!user8) {
    console.log('User test8 not found, creating new user');
    await User.create({
      username: 'test8',
      email: 'test8@example.com',
      password: '2002', // Plain text or hashed depending on your model
      bills: [
        { month: 'February', year: 2025, billAmount: 1100, dueDate: new Date('2025-03-25'), consumption: 340 },
        { month: 'March', year: 2025, billAmount: 600, dueDate: new Date('2025-04-25'), consumption: 360 },
        { month: 'April', year: 2025, billAmount: 1320, dueDate: new Date('2025-05-25'), consumption: 380 },
        { month: 'May', year: 2025, billAmount: 100, dueDate: new Date('2025-06-25'), consumption: 400 },
        { month: 'June', year: 2025, billAmount: 2000, dueDate: new Date('2025-07-25'), consumption: 420 },
      ],
    });
    console.log('New user test8 created and bill histories added');
  } else {
    console.log('User test8 found and updated');
  }
};

seedUsers().catch((error) => console.error(error));
