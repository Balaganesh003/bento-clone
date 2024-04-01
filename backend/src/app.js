const express = require('express');
const cookieSession = require('cookie-session');
const authRouter = require('./routes/auth.router.js');

const app = express();

app.use(express.json());
app.use(
  cookieSession({
    name: 'session',
    keys: [process.env.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000, // 24 hours
  })
);

app.use('/api/auth', authRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

module.exports = app;
