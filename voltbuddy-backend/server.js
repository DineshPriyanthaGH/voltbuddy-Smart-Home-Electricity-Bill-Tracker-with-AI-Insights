require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chat');  
const billHistoryRoutes = require('./routes/billHistoryRoutes'); 

const app = express();

// CORS configuration to allow frontend origin and Authorization header
app.use(cors({
  origin: 'http://localhost:3000',  // frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],  // allow Authorization header for JWT
  credentials: true, // if you want to support cookies, sessions etc.
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('DB connected!'))
  .catch(err => console.error('DB connection error:', err));

app.use('/api/auth', authRouter);
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes); 
app.use('/api/bills', billHistoryRoutes);

app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
