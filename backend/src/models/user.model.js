const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true, // Ensure email is stored in lowercase
  },
  password: {
    type: String,
    required: false,
  },
  googleId: String,
  profileDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Profile',
  },
  resetPasswordOTP: String,
  resetPasswordOTPExpiry: Date,
});

const User = mongoose.model('User', userSchema);

module.exports = User;
