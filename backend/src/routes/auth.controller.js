const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { setInitialProfile } = require('./profile.controller');

const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message:
          'A user with this email already exists. Please try logging in instead.',
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // Generate JWT token for the newly registered user
    const token = jwt.sign({ userId: newUser._id }, 'abcd', {
      expiresIn: '1h', // Set token expiration time
    });

    // Send token in response (e.g., as a cookie or in the response body)
    res.cookie('jwt', token, {
      httpOnly: true, // Cookie accessible only by the web server
      secure: false, // Set to true if using HTTPS
    });

    await setInitialProfile(newUser._id);

    // Respond with success message and token
    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid Password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { userId: user._id },
      'abcd',
      {
        expiresIn: '1h',
      },
      (err, token) => {
        // Send token in cookie
        console.log('Token:', token);
        res
          .cookie('jwt', token, {
            // httpOnly: true,
            // secure: false,
          })
          .status(200)
          .json({
            message: 'Logged in successfully',
            token,
            username: user.username,
          });
      }
    );
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const logout = (req, res) => {
  res.clearCookie('jwt');
  res.status(200).json({ message: 'Logged out successfully' });
};

const checkUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    } else {
      return res.status(200).json({ message: 'Username available' });
    }
  } catch (error) {
    console.error('Check username error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login, logout, checkUsername };
