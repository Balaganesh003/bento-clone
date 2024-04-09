const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const User = require('../models/user.model.js');

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      const googleId = profile.id; // Extract Google ID from profile

      try {
        // Check if the user already exists in the database
        let user = await User.findOne({ email });

        if (!user) {
          // Create a new user with email and Google ID
          user = await User.create({ email, googleId });
        } else if (!user.googleId) {
          // If user exists but does not have a Google ID, update the Google ID
          user.googleId = googleId;
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        console.error('Google OAuth error:', error);
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
