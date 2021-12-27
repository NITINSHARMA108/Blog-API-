const express = require('express');
const passport = require('passport');

const router = express.Router();
const userController = require('../controllers/userController');
const blogController = require('../controllers/blogController');

router.get('/', userController.redirect);

router.get('/posts', blogController.get_blogs);

router.get('/posts/:id', userController.get_single_blog);

router.get('/admin_signin', userController.get_signin);

router.get('/admin_signup', userController.get_signup);

router.post('/admin_signin', passport.authenticate('local'), userController.sign_in);

router.post('/admin_signup', userController.admin_signup);

router.post('/delete_blog/:id', blogController.delete_blog);

router.post('/update_blog', blogController.post_update_blog);

router.post('/create_blog', blogController.create_blog);

router.get('/check_authentication', userController.check_authentication);

router.post('/post_comment', blogController.post_comments);

router.post('/admin_signout', userController.signout);

router.get('/post/:id', blogController.get_blog);

router.get('/createBlog', blogController.createBlog);

router.get('/update_blog/:id', blogController.get_updateBlog);

module.exports = router;
