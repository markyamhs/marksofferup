const express = require('express');
const multer = require('multer');
const { addPost, getPosts, getPostById } = require('../services/post');
const CONDITIONS = require('../models/conditions');
const CATEGORIES = require('../models/category');

const postController = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

//@route   POST /api/post
//@access  public
//@usage   Allow user to add a new post
postController.post('/', upload.array('images'), async (req, res) => {
  try {
    const post = await addPost(req.body, req.files);
    return res.send(post);
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: e,
    });
  }
});

//@route   GET /api/getAll
//@access  public
//@usage   Allow user to fetch all existing posts
postController.get('/getAll', async (req, res) => {
  try {
    const posts = await getPosts();
    return res.send(posts);
  } catch (e) {
    return res.status(500).send({
      message: e,
    });
  }
});

//@route   GET /api/post/:postId
//@access  public
//@usage   Allow user to fetch a post by id
postController.get('/:postId', async (req, res) => {
  try {
    const post = await getPostById(req.params.postId);
    return res.send(post);
  } catch (e) {
    return res.status(400).send({
      message: e,
    });
  }
});

//@route   GET /api/post?page=2&limit=10
//@access  public
//@usage   Allow user to search existing posts with different criteria (e.g. pagination, search by title, etc)
postController.get('/', async (req, res) => {
  if (!req.query) {
    try {
      const posts = await getPosts();
      return res.send(posts);
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }
  try {
    const posts = await getPosts(req.query);
    res.send(posts);
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: e,
    });
  }
});

//@route   GET /api/enums
//@access  public
//@usage   Allow user to fetch all enums (e.g. item categories, item conditions, etc.)
postController.get('/enums', async (req, res) => {
  res.send({
    categories: CATEGORIES,
    conditions: CONDITIONS,
    initialFormFields: {
      title: '',
      sellerName: '',
      sellerEmail: '',
      description: '',
      locatedCity: '',
      locatedState: '',
      price: '',
      condition: '',
      category: '',
    },
  });
});

module.exports = postController;
