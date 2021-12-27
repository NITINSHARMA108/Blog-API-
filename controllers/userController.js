const mongoose = require('mongoose');
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Blog = require('../models/blog');
const User = require('../models/User');

exports.get_single_blog = async (req, res, next) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  if (blog) {
    res.status(200).json({ blog });
  } else {
    res.status(400).json({ error: 'Unable to fetch Blogs' });
  }
};

exports.admin_signup = async (req, res, next) => { /* [
  body('username').trim().isLength({ min: 1 }).escape(),
  body('password').trim().isLength({ min: 6 }).escape(),
  body('passcode').trim().isLength({ min: 1 }).escape(), */
  /* const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(404).json({ errors: 'error in form data', error: errors });
  } */

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, async (err, hash) => {
      if (err) {
        console.log(`unable to encrypt password ${err}`);
        res.status(401).json({ message: `unable to encrypt password ${err}` });
      } else if (req.body.passcode === '325476') {
        const checkExistence = await User.findOne({ username: req.body.username });
        console.log(checkExistence);
        if (checkExistence) {
          res.render('adminSignUp', { error: ['username already exists'] });
        } else if (req.body.password.length < 6) {
          res.render('adminSignUp', { error: ['password length should be minimum 6 characters long'] });
        } else {
          const response = await User.create({
            username: req.body.username,
            password: hash,
          });

          if (!response) {
            console.log('error in uploading data to database');
            res.render('adminSignUp', { error: ['Some error occured \n please Try Again'] });
          } else {
            console.log('data uploaded successfully');
            res.render('adminSignIn');
          }
        }
      } else {
        res.render('adminSignUp', { error: ['passcode is incorrect'] });
      }
    });
  });
};
// ];

exports.sign_in = (req, res, next) => {
  console.log(req.session);
  res.redirect('/posts');
};

exports.redirect = (req, res, next) => {
  res.redirect('/posts');
};

exports.signout = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout();
    res.redirect('/posts');
  } else {
    res.redirect('/posts');
  }
};

exports.check_authentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ message: 'user authenticated' });
  } else {
    res.status(400).json({ message: 'user unauthorized' });
  }
};

exports.get_signin = (req, res, next) => {
  res.render('adminSignIn');
};

exports.get_signup = (req, res, next) => {
  res.render('adminSignup');
};
