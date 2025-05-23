require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRouter = require('./routers/authRouter');

const app = express();

// Enhanced CORS configuration
app.use(cors({
  origin: '*', // Allow all origins (for development)
  methods: ['GET', 'POST'], // Allowed methods
  allowedHeaders: ['Content-Type'] // Allowed headers
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('DB connected!'))
  .catch(err => console.error('DB connection error:', err));

// Routes
app.use('/api/auth', authRouter);

// Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));