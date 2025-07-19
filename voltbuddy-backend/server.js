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
const { errorHandler } = require('./middleware/authMiddleware');


const app = express();

app.use(cors({
  origin: 'http://localhost:3000',
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
  .then(() => console.log('DB connected!'))
  .catch(err => console.error('DB connection error:', err));

app.use('/api/users', userRoutes);
app.use('/api/energy-tips', energyTipsRoutes);
app.use('/api/auth', authRouter);
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/bills', billHistoryRoutes);
app.use('/api/appliances', applianceRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
