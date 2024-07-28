const express = require('express');
const authRouter = express.Router();
const passport = require('passport');
const dotenv = require('dotenv');
const authController = require('./auth.controller.js');
const jwt = require('jsonwebtoken');
dotenv.config();

authRouter.get('/checkusername/:username', authController.checkUsername);
authRouter.post('/signup', authController.register);
authRouter.post('/signin', authController.login);
authRouter.get('/signout', authController.logout);

authRouter.post('/forgot-password', authController.forgotPassword);
authRouter.post('/verify-reset-otp', authController.verifyResetOTP);
authRouter.post('/reset-password', authController.resetPassword);

authRouter.get(
  '/google',
  (req, res, next) => {
    const signupName = req.cookies.name;

    if (signupName) {
      req.session.signupName = signupName;
    }
    next();
  },
  passport.authenticate('google', {
    scope: ['profile', 'email'],
    session: true,
  })
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login/failed',
    session: true,
  }),
  (req, res) => {
    if (req.user) {
      const token = jwt.sign(
        { userId: req.user._id, username: req.user.username },
        process.env.JWT_SECRET,
        { expiresIn: '15d' }
      );

      res.cookie('jwt', token, {
        maxAge: 1000 * 60 * 60 * 24 * 15,
        secure: process.env.NODE_ENV === 'production',
      });

      const signupName = req.session.signupName;
      console.log('session after', req.sessionID, signupName);

      res.redirect(`${process.env.CLIENT_URL}/${req.user.username}`);
    } else {
      res.redirect('/login/failed');
    }
  }
);

module.exports = authRouter;
