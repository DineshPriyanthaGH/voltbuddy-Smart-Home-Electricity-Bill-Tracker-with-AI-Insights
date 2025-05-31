require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express();

// CORS configuration - open for development; restrict in production
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to MongoDB using URI from .env
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('DB connected!'))
  .catch(err => console.error('DB connection error:', err));

// Register route handlers
app.use('/api/auth', authRouter);
app.use('/api/user', userRoutes);


// Simple test route
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start server on port from .env or default 5001
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
