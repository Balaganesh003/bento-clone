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
});

const User = mongoose.model('User', userSchema);

module.exports = User;
