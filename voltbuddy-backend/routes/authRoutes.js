const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');

// POST for registration
router.post('/register', register);

// GET for login (as requested)
router.post('/login', login);

module.exports = router;