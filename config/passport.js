const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    const user = await User.findOne({ username });
    if (!user) {
      done(null, false, { message: 'user not found' });
    } else {
      bcrypt.compare(password, user.password)
        .then((res) => {
          if (res) {
            return done(null, user);
          }
          return done(null, false, { message: 'password not matched' });
        })
        .catch((err) => done(err));
    }
  }),
);
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
