const express = require('express');
const passport = require('passport');

const router = express.Router();
const userController = require('../controllers/userController');
const blogController = require('../controllers/blogController');

router.get('/', userController.redirect);

router.get('/posts', userController.get_blogs);

router.get('/posts/:id', userController.get_single_blog);

router.post('/admin_signin', passport.authenticate('local'), userController.sign_in);

router.post('/admin_signup', userController.admin_signup);

router.post('/delete_blog', blogController.delete_blog);

router.post('/post/:id/update', blogController.post_update_blog);

router.post('/create_blog', blogController.create_blog);

router.get('/check_authentication', userController.check_authentication);

router.post('/post_comment', blogController.post_comments);

module.exports = router;
