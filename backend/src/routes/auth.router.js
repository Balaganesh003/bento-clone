const express = require('express');
const authRouter = express.Router();
const authController = require('./auth.controller.js');

authRouter.post('/signup', authController.register);
authRouter.post('/signin', authController.login);
authRouter.get('/signout', authController.logout);

module.exports = authRouter;
