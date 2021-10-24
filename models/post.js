const mongoose = require('mongoose');
const CONDITIONS = require('./conditions');
const CATEGORIES = require('./category');
const validateEmail = (email) => {
  const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  sellerName: {
    type: String,
    required: true,
  },
  sellerEmail: {
    type: String,
    trim: true,
    lowercase: true,
    required: true,
    validate: [validateEmail, 'Please fill a valid email address'],
  },
  description: {
    type: String,
    required: true,
  },
  thumbnail: {
    type: String,
    required: true,
  },
  images: [{type: String}],
  locatedCity: {
    type: String,
    required: true,
  },
  locatedState: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  condition: {
    type: String,
    required: true,
    enum: CONDITIONS,
  },
  category: {
    type: String,
    required: true,
    enum: CATEGORIES,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Post', postSchema);
