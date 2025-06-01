const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET;

// Middleware to protect routes
async function authMiddleware(req, res, next) {
  try {
    // Extract the token from the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No token provided or invalid format');
      console.error('No token provided');
      return res.status(401).json({ message: 'No token provided' });
    }

    // Get the token from the authorization header
    const token = authHeader.split(' ')[1];

    // Verify the token using JWT_SECRET
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find the user from the decoded token payload
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) return res.status(401).json({ message: 'User not found' });

    // Attach the user object to the request object for use in subsequent middleware or route handlers
    req.user = user;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized' });
  }
}

module.exports = authMiddleware;
