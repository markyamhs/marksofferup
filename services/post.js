require('dotenv').config();
const Post = require('../models/post');
const { uploadFile } = require('../s3');

// uploads a post to the db
async function addPost(postDetails, images) {
  if (!images || images.length == 0) {
    throw 'no image provided';
  }
  const s3urls = [];
  let thumbnailUrl = null;
  for (let imageCount = 0; imageCount < images.length; imageCount++) {
    const result = await uploadFile(images[imageCount]);
    s3urls.push(result.Location);
  }
  thumbnailUrl = s3urls[postDetails.thumbnail];
  let post = new Post({
    title: postDetails.title,
    sellerName: postDetails.sellerName,
    sellerEmail: postDetails.sellerEmail,
    description: postDetails.description,
    thumbnail: thumbnailUrl,
    images: s3urls,
    locatedCity: postDetails.locatedCity,
    locatedState: postDetails.locatedState,
    price: postDetails.price,
    condition: postDetails.condition,
    category: postDetails.category,
  });
  post = await post.save();
  return post;
}
exports.addPost = addPost;

// get post(s) from the db with criteria
async function getPosts(options = null) {
  if (!options) {
    return await Post.find({}).sort({ createdAt: -1 });
  }
  const {
    title,
    minPrice,
    maxPrice,
    category,
    condition,
    page,
    limit,
  } = options;
  const dbQuery = {};
  if (title) {
    //case insensitive
    dbQuery.title = { $regex: title, $options: 'i' };
  }
  if (minPrice && maxPrice) {
    dbQuery.price = {
      $gte: minPrice,
      $lte: maxPrice,
    };
  } else if (minPrice) {
    dbQuery.price = {
      $gte: minPrice,
    };
  } else if (maxPrice) {
    dbQuery.price = {
      $lte: maxPrice,
    };
  }
  if (category && category !== 'All') {
    dbQuery.category = category;
  }
  if (condition && condition !== 'All') {
    dbQuery.condition = condition;
  }
  if (page === undefined || limit === undefined) {
    return await Post.find(dbQuery).sort({ createdAt: -1 });
  } else {
    return await Post.find(dbQuery)
      .sort({ createdAt: -1 })
      .skip((parseInt(page) - 1) * parseInt(limit))
      .limit(parseInt(limit));
  }
}
exports.getPosts = getPosts;

// get post from the db by id
async function getPostById(id) {
  const post = await Post.findById(id);
  if (post) {
    return post;
  } else {
    throw 'The post you search for does not exist.';
  }
}
exports.getPostById = getPostById;