const express = require('express');
const passport = require('passport');

const router = express.Router();
const userController = require('../controllers/userController');
const blogController = require('../controllers/blogController');

router.get('/', userController.redirect);

router.get('/posts', blogController.get_blogs);

router.get('/post/:id', blogController.get_blog);

router.post('/post/:id/post_comment', blogController.post_comments);

// delete blog
router.post('/delete_blog/:id', blogController.delete_blog);

// create blog
router.get('/createBlog', blogController.createBlog);

router.post('/create_blog', blogController.create_blog);

// update blog
router.get('/update_blog/:id', blogController.get_updateBlog);

router.post('/update_blog/:id', blogController.post_update_blog);

// admin Sign In
router.get('/admin_signin', userController.get_signin);

router.post('/admin_signin', passport.authenticate('local', { failureRedirect: '/admin_signin' }), userController.sign_in);

// admin Sign Up
router.get('/admin_signup', userController.get_signup);

router.post('/admin_signup', userController.admin_signup);

// admin Sign Out
router.post('/admin_signout', userController.signout);

router.get('/check_authentication', userController.check_authentication);

module.exports = router;
