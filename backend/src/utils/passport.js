const passport = require('passport');
const { Strategy: GoogleStrategy } = require('passport-google-oauth20');
const User = require('../models/user.model.js');
const Profile = require('../models/porfile.model.js');
const { temporaryNameStorage } = require('../routes/auth.router.js'); // Adjust the path as needed

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/callback',
      passReqToCallback: true, // Pass the request object to the callback
    },
    async (req, accessToken, refreshToken, profile, done) => {
      const email = profile.emails[0].value;
      const googleId = profile.id;
      const sessionId = req.sessionID;
      const signupName = req.session.signupName;

      console.log('session after:', sessionId, signupName);

      try {
        let user = await User.findOne({ email });

        if (!user) {
          const username = signupName || email.split('@')[0];
          user = await User.create({ email, googleId, username });

          // Create initial profile
          const newProfile = await Profile.create({
            user: user._id,
            displayName: profile.displayName || username,
            profiles: [],
          });

          user.profileDetails = newProfile._id;
          await user.save();
        } else if (!user.googleId) {
          user.googleId = googleId;
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        console.error('Google OAuth error:', error);
        return done(error);
      } finally {
        // Clean up the temporary name storage
        if (signupName) {
          temporaryNameStorage.delete(sessionId);
        }
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

module.exports = passport;
