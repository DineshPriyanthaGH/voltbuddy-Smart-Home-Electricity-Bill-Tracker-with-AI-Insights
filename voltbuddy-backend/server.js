require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chat');
const billHistoryRoutes = require('./routes/billHistoryRoutes');
const applianceRoutes = require('./routes/applianceRoutes');
const energyTipsRoutes = require('./routes/energyTipsRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const insightsRoutes = require('./routes/insightsRoutes');
const testEmailRoutes = require('./routes/testEmailRoutes');
const billHistoryEmailRoutes = require('./routes/billHistoryEmailRoutes');
const NotificationService = require('./services/notificationService');
const { errorHandler } = require('./middleware/authMiddleware');

const app = express();

// CORS configuration to handle multiple deployment URLs
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:5001',
  'https://voltbuddy-smart-home-electricity-bi.vercel.app',
  'https://voltbuddy-smart-home-electricity-bi-five.vercel.app',
  /^https:\/\/voltbuddy-smart-home-electricity-bi.*\.vercel\.app$/,
  'file://'
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    // Check if origin is in allowed list or matches pattern
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === 'string') {
        return allowedOrigin === origin;
      }
      if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return false;
    });
    
    if (isAllowed) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 10000
})
  .then(() => console.log('✅ Database connected successfully!'))
  .catch(err => console.error('❌ DB connection error:', err));

app.use('/api/users', userRoutes);
app.use('/api/energy-tips', energyTipsRoutes);
app.use('/api/auth', authRouter);
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/bills', billHistoryRoutes);
app.use('/api/appliances', applianceRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/insights', insightsRoutes);
app.use('/api/test', testEmailRoutes);
app.use('/api/bill-history-email', billHistoryEmailRoutes);

// Test email route to verify email functionality
app.post('/api/test-email', async (req, res) => {
  try {
    const { sendProfileUpdateEmail } = require('./utils/emailService');
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    console.log(' Testing email functionality for:', email);
    
    // Test email with mock user data
    const mockUser = {
      email: email,
      firstName: 'Test',
      lastName: 'User'
    };
    
    const mockChanges = {
      firstName: 'Updated Name',
      email: 'Previous email was different'
    };
    
    await sendProfileUpdateEmail(mockUser, mockChanges);
    
    res.json({ 
      success: true, 
      message: 'Test email sent successfully',
      sentTo: email
    });
    
  } catch (error) {
    console.error(' Test email failed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send test email',
      error: error.message
    });
  }
});

// Test bill tracking email route
app.post('/api/test-bill-email', async (req, res) => {
  try {
    const { sendBillTrackingEmail } = require('./utils/emailService');
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    console.log('Testing bill tracking email for:', email);
    
    // Test email with mock bill data
    const mockUser = {
      email: email,
      firstName: 'Test',
      lastName: 'User',
      username: 'testuser'
    };
    
    const mockBillDetails = {
      month: 'January',
      year: 2025,
      billAmount: 2500.75,
      consumption: 150,
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
      energyCharge: 1800.50,
      fixedCharge: 500.00,
      sscl: 57.51
    };
    
    await sendBillTrackingEmail(mockUser, mockBillDetails);
    
    res.json({ 
      success: true, 
      message: 'Test bill tracking email sent successfully',
      sentTo: email,
      billAmount: mockBillDetails.billAmount
    });
    
  } catch (error) {
    console.error('❌ Test bill tracking email failed:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send test bill tracking email',
      error: error.message
    });
  }
});

app.use(errorHandler);

// Automated bill reminder system - runs daily at 9 AM
const cron = require('node-cron');

// Schedule task to run every day at 9:00 AM
cron.schedule('0 9 * * *', async () => {
  console.log('Daily automated bill reminder check started at 9:00 AM');
  try {
    await NotificationService.checkAndSendUnpaidBillReminders();
    console.log(' Daily bill reminder check completed');
  } catch (error) {
    console.error(' Error in daily bill reminder check:', error);
  }
});



const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('Automated email reminder system is active');
  console.log('Bill reminders will be sent daily at 9:00 AM for unpaid bills after 20th of each month');
});
