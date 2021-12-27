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
      const response = await bcrypt.compare(password, user.password);
      done(null, user);
    }
  }),
);
passport.serializeUser((user, done) => {
  console.log('serialize');
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
