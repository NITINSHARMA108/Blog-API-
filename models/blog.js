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

Blog
  .virtual('formal_date')
  .get(() => {
    console.log(this.date);
    /* const day = this.date.getDate();
    const month = this.date.getMonth();
    const year = this.date.getFullYear();
    return `${day}/${month}/${year}`; */
    return this.date;
  });

module.exports = mongoose.model('Blog', Blog);
