const { findById } = require('../models/blog');
const Blog = require('../models/blog');

exports.delete_blog = async (req, res, next) => {
  const { id } = req.params;
  if (req.isAuthenticated()) {
    const response = await Blog.findByIdAndDelete(id);
    if (!response) {
      res.redirect('/login');
    } else {
      res.redirect('/posts');
    }
  } else {
    res.redirect('/login');
  }
};

exports.get_update_blog = async (req, res, next) => {
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
};

exports.post_update_blog = async (req, res, next) => {
  if (req.isAuthenticated()) {
    const response = await Blog.findByIdAndUpdate(req.body.id, {
      title: req.boddy.title,
      content: req.body.content,
      status: req.body.status,
    });
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
