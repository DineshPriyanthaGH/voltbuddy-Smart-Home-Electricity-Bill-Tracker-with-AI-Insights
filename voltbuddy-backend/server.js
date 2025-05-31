require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chat');  // New chat route

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('DB connected!'))
  .catch(err => console.error('DB connection error:', err));

app.use('/api/auth', authRouter);
app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes); // Mount chatbot route here

app.get('/', (req, res) => {
  res.send('Server is running');
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
