const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User.js');

const passportAuth = (passport) => {
  // Strategy config
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        // done(null, profile); // passes the profile data to serializeUser
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          image: profile.photos[0].value,
        };

        try {
          let user = await User.findOne({ googleId: profile.id });
          if (user) {
            done(null, user);
          } else {
            user = await User.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.log(err);
        }
      },
    ),
  );

  // Used to stuff a piece of information into a cookie
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // Used to decode the received cookie and persist session
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};

module.exports = passportAuth;
