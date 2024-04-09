const express = require('express');
const cookieSession = require('cookie-session');
const cors = require('cors');
const passport = require('passport');
const authRouter = require('./routes/auth.router.js');
const dotenv = require('dotenv');
const passportConfig = require('./utils/passport.js');
const path = require('path');
const helmet = require('helmet');
dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use((req, res, next) => {
  if (req.session && !req.session.regenerate) {
    req.session.regenerate = (cb) => {
      cb();
    };
  }
  if (req.session && !req.session.save) {
    req.session.save = (cb) => {
      cb();
    };
  }
  next();
});

app.use(passport.initialize());

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use('/auth', authRouter);

app.use(express.static(path.join(__dirname, '..', 'public')));
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

module.exports = app;
