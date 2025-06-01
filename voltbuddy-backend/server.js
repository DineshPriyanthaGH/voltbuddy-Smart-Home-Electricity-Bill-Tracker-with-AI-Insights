require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import routes
const authRouter = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chat');  // New chat route
const billHistoryRoutes = require('./routes/billHistoryRoutes'); // Add the bill history route

const app = express();

// Middleware setup
app.use(cors({
  origin: '*',  // Allows all domains (you can restrict this in production)
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection setup
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('DB connected!'))
  .catch(err => console.error('DB connection error:', err));

// Use routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes); // Mount chatbot route here
app.use('/api/bills', billHistoryRoutes); // Mount the bill history route

// Default route to test server status
app.get('/', (req, res) => {
  res.send('Server is running');
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
