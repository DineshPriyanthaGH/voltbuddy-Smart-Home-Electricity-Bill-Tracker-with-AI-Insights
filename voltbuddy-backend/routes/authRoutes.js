// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authControllers');
const { registerUser, loginUser, getMe } = authController;

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', getMe);

module.exports = router;
