const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { setInitialProfile } = require('./profile.controller');
require('dotenv').config();

const app = express();

const generateToken = (userId, username) => {
  return jwt.sign({ userId, username }, process.env.JWT_SECRET, {
    expiresIn: '15d',
  });
};

const register = async (req, res) => {
  const { email, password, username } = req.body;

  try {
    console.log('Register request received:', { email, username });

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Email is already registered:', email);
      return res.status(400).json({ message: 'Email is already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id, newUser.username);

    // Set initial profile for the user
    await setInitialProfile(newUser._id);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 15,
      secure: process.env.NODE_ENV == 'production', // Since you are using HTTPS
      sameSite: 'none',
    });

    console.log('User registered successfully:', newUser._id);

    res.status(201).json({ message: 'User registered successfully', token });
  } catch (error) {
    console.error('Registration error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log('Login request received:', email);

    const user = await User.findOne({ email });
    if (!user) {
      console.log('Invalid credentials for email:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Invalid password for email:', email);
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id, user.username);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 15,
      secure: process.env.NODE_ENV == 'production', // Since you are using HTTPS
      sameSite: 'none',
    });

    console.log('Logged in successfully:', user._id);

    res.status(200).json({
      message: 'Logged in successfully',
      token,
      username: user.username,
    });
  } catch (error) {
    console.error('Login error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

const logout = (req, res) => {
  console.log('Logout request received');

  res.clearCookie('jwt', {
    httpOnly: true,
    secure: process.env.NODE_ENV == 'production', // Since you are using HTTPS
    sameSite: 'none',
  });
  res.status(200).json({ message: 'Logged out successfully' });

  console.log('Logged out successfully');
};

const checkUsername = async (req, res) => {
  const { username } = req.params;

  try {
    console.log('Check username request received:', username);

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('Username already exists:', username);
      return res.status(400).json({ message: 'Username already exists' });
    } else {
      console.log('Username available:', username);
      return res.status(200).json({ message: 'Username available' });
    }
  } catch (error) {
    console.error('Check username error:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login, logout, checkUsername };
