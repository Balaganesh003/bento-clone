const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const { setInitialProfile } = require('./profile.controller');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
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

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: subject,
      text: text,
    });

    console.log('Email sent successfully');
  } catch (error) {
    console.error('Email send error:', error);
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();
    const otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpiry = otpExpiry;
    await user.save();

    // Send email
    await sendEmail(
      email,
      'Bento Password Reset OTP',
      `Your OTP for password reset is: ${otp}. This OTP is valid for 10 minutes.`
    );

    res.status(200).json({ message: 'OTP sent to email' });
  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const verifyResetOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({
      email,
      resetPasswordOTP: otp,
      resetPasswordOTPExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    res.status(200).json({ message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    const user = await User.findOne({
      email,
      resetPasswordOTP: otp,
      resetPasswordOTPExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password and clear reset fields
    user.password = hashedPassword;
    user.resetPasswordOTP = undefined;
    user.resetPasswordOTPExpiry = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  register,
  login,
  logout,
  checkUsername,
  forgotPassword,
  verifyResetOTP,
  resetPassword,
};
