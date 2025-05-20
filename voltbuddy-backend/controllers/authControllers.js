const jwt = require('jsonwebtoken');
const User = require('../models/User');  // User model for storing user data
const { sendOtp, verifyOtp } = require('../services/smsService');  