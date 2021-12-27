const mongoose = require('mongoose');
const { DateTime } = require('luxon');

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

Blog.virtual('formal_date').get(function () {
  const formalDate = DateTime.fromJSDate(this.date).toLocaleString(
    DateTime.DATETIME_MED,
  );
  return formalDate;
});

module.exports = mongoose.model('Blog', Blog);
