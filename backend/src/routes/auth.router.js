const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const dotenv = require('dotenv');
const authController = require('./auth.controller.js');
dotenv.config();

authRouter.post('/signup', authController.register);
authRouter.post('/signin', authController.login);
authRouter.get('/signout', authController.logout);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login/failed',
    successRedirect: process.env.CLIENT_URL,
  })
);

authRouter.get('/login/failed', (req, res) => {
  res.send('Failed to login');
});

authRouter.get('/login/success', (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: 'user has successfully authenticated',
      user: req.user,
      cookies: req.cookies,
    });
  } else {
    res.status(403).json({
      error: true,
      message: 'user failed to authenticate',
    });
  }
});

authRouter.get(
  '/google',
  passport.authenticate('google', { scope: ['email'] })
);

module.exports = authRouter;
