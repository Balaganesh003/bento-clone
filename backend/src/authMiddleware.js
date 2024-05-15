const jwt = require('jsonwebtoken');
const User = require('./models/user.model');
require('dotenv').config();

const authMiddleware = async (req, res, next) => {
  try {
    // Check for the authorization header
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    const urlUsername = req.params.username;

    // Verify the token if present
    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { userId, username } = decoded;

      console.log('userId:', userId);
      console.log('username:', username);
      const user = await User.findById(userId);

      if (!user) {
        console.log('Unauthorized: User not found');
        return res
          .status(401)
          .json({ message: 'Unauthorized: User not found' });
      }

      if (user.username !== username || username !== urlUsername) {
        console.log('Unauthorized: Invalid token');

        return res.status(401).json({ message: 'Unauthorized: Invalid token' });
      }

      // Attach the user object to the request for further processing
      req.user = user;
    }

    // Continue to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Token verification error:', error);
    return res.status(403).json({ message: 'Unauthorized: Invalid token' });
  }
};

module.exports = authMiddleware;
