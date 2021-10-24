const express = require('express');
const multer = require('multer');
const { uploadFile } = require('../s3');
const Post = require('../models/post');
const CONDITIONS = require('../models/conditions');
const CATEGORIES = require('../models/category');

const router = express.Router();

const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

//@route   POST /api/addPost
//@access  public
//@usage   Allow user to add a new post
router.post('/addPost', upload.array('images'), async (req, res) => {
  const images = req.files;
  const s3urls = [];
  let thumbnailUrl = null;
  try {
    for (let imageCount = 0; imageCount < images.length; imageCount++) {
      const result = await uploadFile(images[imageCount]);
      s3urls.push(result.Location);
    }
    thumbnailUrl = s3urls[req.body.thumbnail];
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: 'Server encountered image(s) upload error.',
    });
  }
  try {
    let post = new Post({
      title: req.body.title,
      sellerName: req.body.sellerName,
      sellerEmail: req.body.sellerEmail,
      description: req.body.description,
      thumbnail: thumbnailUrl,
      images: s3urls,
      locatedCity: req.body.locatedCity,
      locatedState: req.body.locatedState,
      price: req.body.price,
      condition: req.body.condition,
      category: req.body.category,
    });
    post = await post.save();
    res.send(post);
  } catch (e) {
    console.log(e);
    return res.status(400).send({
      message: 'Incorrect post format.',
    });
  }
});

//@route   GET /api/getAll
//@access  public
//@usage   Allow user to fetch all existing posts
router.get('/getAll', async (req, res) => {
  try {
    const posts = await Post.find({});
    res.send(posts);
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: 'Server encountered database error.',
    });
  }
});

//@route   GET /api/get?page=2&limit=10
//@access  public
//@usage   Allow user to fetch all existing posts
router.get('/get', async (req, res) => {
  if(!req.query.page || !req.query.limit){
    res.status(400).send({
      message: 'Please include page and limit param.',
    });
  }
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const posts = await Post.find({})
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);
    res.send(posts);
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: 'Server encountered database error.',
    });
  }
});

//@route   GET /api/detail/:postId
//@access  public
//@usage   Allow user to fetch a post by id
router.get('/details/:postId', async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (post) {
      res.send(post);
    } else {
      res
        .status(400)
        .send({ message: 'The post you search for does not exist.' });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: 'Server encountered database error.',
    });
  }
});

//@route   GET /api/filter
//@access  public
//@usage   Allow user to search existing posts
router.get('/filter', async (req, res) => {
  try {
    let posts = null;
    if (req.query && Object.keys(req.query).length === 0) {
      return res.status(400).send({
        message: 'Please provide search criteria.',
      });
    } else {
      const dbQuery = {};
      if (req.query.title) {
        dbQuery.title = { $regex: req.query.title, $options: 'i' };
      }
      if (req.query.minPrice && req.query.maxPrice) {
        dbQuery.price = {
          $gte: req.query.minPrice,
          $lte: req.query.maxPrice,
        };
      } else if (req.query.minPrice) {
        dbQuery.price = {
          $gte: req.query.minPrice,
        };
      } else if (req.query.maxPrice) {
        dbQuery.price = {
          $lte: req.query.maxPrice,
        };
      }
      if (req.query.category && req.query.category !== 'All') {
        dbQuery.category = req.query.category;
      }
      if (req.query.conditions && req.query.conditions.length > 0) {
        dbQuery.condition = { $in: req.query.conditions.split(',') };
      }
      posts = await Post.find(dbQuery);
      res.send({ posts, yourQuery: req.query });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: 'Server encountered database error.',
    });
  }
});

//@route   GET /api/enums
//@access  public
//@usage   Allow user to fetch all enums (e.g. item categories, item conditions, etc.)
router.get('/enums', async (req, res) => {
  res.send({
    categories: CATEGORIES,
    conditions: CONDITIONS,
  });
});

module.exports = router;
