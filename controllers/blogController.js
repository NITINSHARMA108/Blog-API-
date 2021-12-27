const { findById } = require('../models/blog');
const Blog = require('../models/blog');

exports.get_blogs = async (req, res, next) => {
  const blogs = await Blog.find({}).sort({ date: -1 });
  if (req.isAuthenticated()) {
    console.log('hello');
    res.render('Blogs', { blogs, isAdmin: true });
  } else {
    console.log('no hello');
    res.render('Blogs', { blogs, isAdmin: false });
  }
};

exports.delete_blog = async (req, res, next) => {
  const { id } = req.params;
  if (req.isAuthenticated()) {
    const response = await Blog.findByIdAndDelete(id);
    if (!response) {
      res.redirect(`/post/${id}`);
    } else {
      res.redirect('/posts');
    }
  } else {
    res.render('adminSignIn', { error: ['Session Timed Out'] });
  }
};

exports.post_update_blog = async (req, res, next) => {
  const { id } = req.params;
  if (req.isAuthenticated()) {
    const response = await Blog.findByIdAndUpdate(id, {
      title: req.body.title,
      content: req.body.content,
      status: req.body.status,
    });
    res.redirect(`/post/${id}`);
  } else {
    res.render('adminSignIn', { error: ['Session Timed Out'] });
  }
};

exports.create_blog = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const response = await Blog.create({
      title: req.body.title,
      content: req.body.content,
      comments: [],
      status: req.body.status,
    });
    if (!response) {
      res.render('createBlog', { error: ['Some eror occured'] });
    } else {
      res.redirect('/posts');
    }
  } else {
    res.render('adminSignIn', { error: ['Session Timed out'] });
  }
};

exports.post_comments = async (req, res, next) => {
  const { name, comment } = req.body;
  const { id } = req.params;
  const response = await Blog.findById(id);
  const { comments } = response;
  comments.push({ name, comment });
  const updatedResponse = await Blog.findByIdAndUpdate(id, {
    comments,
  });
  const isAdmin = req.isAuthenticated();
  res.redirect(`/post/${id}`);
};

exports.get_blog = async (req, res, next) => {
  const { id } = req.params;
  const response = await Blog.findById(id);
  console.log(response);
  if (req.isAuthenticated()) {
    res.render('Blog_post', { blog: response, isAdmin: true });
  } else {
    res.render('Blog_post', { blog: response, isAdmin: false });
  }
};

exports.createBlog = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.render('createBlog');
  } else {
    res.render('adminSignIn', { error: ['Session Time Out'] });
  }
};

exports.get_updateBlog = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const { id } = req.params;
    const response = await Blog.findById(id);
    res.render('updateBlog', { blog: response });
  } else {
    res.render('adminSignIn', { error: ['Session Time Out'] });
  }
};
