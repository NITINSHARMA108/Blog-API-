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
      res.status(404).json({ message: 'unable to delete' });
    } else {
      res.status(200).json({ message: 'successful deletion' });
    }
  } else {
    res.status(404).json({ message: 'authentication error' });
  }
};

/* exports.get_update_blog = async (req, res, next) => {
  const { id } = req.params;
  if (req.isAuthenticated()) {
    const response = await findById(id);
    if (response) {
      res.status(200).json({ blog: response });
    } else {
      res.status(404).json({ error: 'request not found' });
    }
  } else {
    res.status(401).json({ error: '' });
  }
}; */

exports.post_update_blog = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const response = await Blog.findByIdAndUpdate(req.body.id, {
      title: req.boddy.title,
      content: req.body.content,
      status: req.body.status,
    });
  } else {
    res.staus(402).json({ message: 'unauthorized access' });
  }
};

exports.create_blog = async (req, res, next) => {
  const response = await Blog.create({
    title: req.body.title,
    content: req.body.content,
    comments: [],
    status: req.body.status,
  });
  if (!response) {
    res.status(402).json({ message: 'not able to update database' });
  } else {
    res.status(200).json({ message: 'successfully uploaded' });
  }
};

exports.post_comments = async (req, res, next) => {
  const { id, name, comment } = req.body;
  const response = await Blog.findById(id);
  const { comments } = response;
  comments.push({ name, comment });
  const updatedResponse = await Blog.findByIdAndUpdate(id, {
    comments,
  });
  if (updatedResponse) {
    res.status(200).json({ message: 'successful updated' });
  } else {
    res.status(400).json({ message: 'error in updation' });
  }
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
  res.render('createBlog');
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
