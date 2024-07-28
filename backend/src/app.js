const express = require('express');
const cookieSession = require('cookie-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const passport = require('passport');
const authRouter = require('./routes/auth.router.js');
const dotenv = require('dotenv');
const profileRouter = require('./routes/profile.router.js');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const compression = require('compression');
const session = require('express-session');
dotenv.config();
require('./utils/passport.js');

const app = express();

// Middleware for logging HTTP requests
app.use(morgan('combined'));

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware for parsing JSON requests with a large payload
app.use(bodyParser.json({ limit: '50mb' }));

// Middleware for setting various HTTP headers for security
app.use(helmet());

// Middleware for enabling CORS with specific origins
app.use(
  cors({
    origin: [
      process.env.ORIGIN_1,
      process.env.ORIGIN_2,
      process.env.ORIGIN_3,
      process.env.ORIGIN_4,
    ],
    credentials: true,
  })
);

// Middleware for handling sessions with cookies
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      secure: process.env.NODE_ENV === 'production',
    },
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Fix for potential issues with cookie-session in some environments
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

// Middleware for initializing Passport.js
app.use(passport.initialize());

// Rate limiting middleware to prevent abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Middleware for response compression
app.use(compression());

// Route handlers
app.use('/auth', authRouter);
app.use('/profile', profileRouter);

// Basic route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

module.exports = app;
