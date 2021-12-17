const mongoose = require('mongoose');
const passport = require('passport');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const Blog = require('../models/blog');
const User = require('../models/User');

exports.get_blogs = async (req, res, next) => {
  const blogs = await Blog.find({}).sort({ date: -1 });
  res.status(200).json({ blogs });
};

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
  console.log(req.body);
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, async (err, hash) => {
      if (err) {
        res.status(401).json({ message: `unable to encrypt password ${err}` });
      } else if (req.body.passcode === '325476') {
        const checkExistence = await User.find({ username: req.body.username });
        if (checkExistence) {
          res.status(200).json({ message: 'user already exists' });
        } else {
          const response = await User.create({
            username: req.body.username,
            password: hash,
          });
          if (!response) {
            res
              .status(404)
              .json({ error: 'error in uploading data to database' });
          } else {
            res.status(200).json({ message: 'data uploaded successfully' });
          }
        }
      } else {
        res.status(402).json({ message: 'passcode is not correct' });
      }
    });
  });
};
// ];

exports.sign_in = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ message: 'sign in successful' });
  } else {
    res.status(402).json({ message: 'unauthorized access' });
  }
};

exports.redirect = (req, res, next) => {
  res.redirect('/posts');
};

exports.signout = (req, res, next) => {
  if (req.isAuthenticated()) {
    req.logout();
    res.redirect('/login');
  } else {
    next('session timed out');
  }
};

exports.check_authentication = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json({ message: 'user authenticated' });
  } else {
    res.status(400).json({ message: 'user unauthorized' });
  }
};
