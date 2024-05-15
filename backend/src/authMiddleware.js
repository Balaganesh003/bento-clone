const jwt = require('jsonwebtoken');
const User = require('./models/user.model');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  try {
    // Check for the authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      console.log('Unauthorized: Missing token');
      return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    // Verify the token using the secret key
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Extract userId and username from the decoded token
    const { userId, username } = decoded;

    // Check if the user exists in the database
    const user = await User.findById(userId);

    if (!user) {
      console.log('Unauthorized: User not found');
      return res.status(401).json({ message: 'Unauthorized: User not found' });
    }

    if (user.username !== username) {
      console.log('Unauthorized: Invalid token');
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }

    // Attach the decoded user object to the request
    req.user = user;
    next(); // Call the next middleware or route handler
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;
