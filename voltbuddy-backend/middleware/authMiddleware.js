const jwt = require('jsonwebtoken');
const User = require('../models/User');
const JWT_SECRET = process.env.JWT_SECRET;

// JWT Authentication Middleware
async function authMiddleware(req, res, next) {
  try {
    // Check for the presence of token in the Authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('No token provided or invalid format');
      return res.status(401).json({ message: 'No token provided or invalid format' });
    }

    // Extract the token from the header
    const token = authHeader.split(' ')[1];

    // Verify the token using the secret key
    const decoded = jwt.verify(token, JWT_SECRET);

    // Find the user by userId in the decoded token
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    // Attach user to the request object for use in routes
    req.user = user;
    
    // Proceed to the next middleware or route handler
    next(); 
  } catch (error) {
    console.error("Authentication error:", error);
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    } else if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    res.status(401).json({ message: 'Unauthorized: Token is expired or invalid' });
  }
}

// Error Handling Middleware
function errorHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message || 'An error occurred',
  });
}

// Export both middlewares
module.exports = {
  authMiddleware,
  errorHandler
};
