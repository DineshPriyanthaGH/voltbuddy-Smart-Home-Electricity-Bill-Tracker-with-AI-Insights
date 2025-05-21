// server.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const admin = require('firebase-admin');  // Firebase Admin SDK

dotenv.config();  // Load environment variables
const app = express();

// Initialize Firebase Admin SDK
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);  // Path to your service account credentials file

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const auth = admin.auth();  // Firebase Authentication instance

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/authRoutes'));  // Register routes for authentication

// DB Connection (MongoDB)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
