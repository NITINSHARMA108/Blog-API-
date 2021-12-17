const mongoose = require('mongoose');

const { Schema } = mongoose;

const Blog = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  comments: {
    type: Array,
  },
  status: {
    type: String,
    default: 'Unpublished',
    required: true,
  },
  date: {
    type: Date,
    default: new Date().toLocaleString('en-US', { timezone: 'Asia/Kolkata' }),
  },
});

module.exports = mongoose.model('Blog', Blog);
