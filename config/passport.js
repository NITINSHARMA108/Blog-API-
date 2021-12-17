const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const verify = (username, password, done) => {
  User.findOne({ username }, async (err, user) => {
    if (err) {
      return done(err);
    }
    if (!user) {
      return done(null, false);
    }

    bcrypt
      .compare(password, user.password)
      .then((res) => {
        if (res) {
          return done(null, user);
        }

        return done(null, false);
      })
      .catch((error) => done(error));
  });
};

const strategy = new LocalStrategy(verify);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});
