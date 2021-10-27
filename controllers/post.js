const { dbAddPost, dbGetPosts, dbGetPostById } = require('../services/post');

//@route   POST /api/post
//@access  public
//@usage   Allow user to add a new post
async function addPost(req, res){
  try {
    const post = await dbAddPost(req.body, req.files);
    return res.send(post);
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: e,
    });
  }
};

//@route   GET /api/post/:postId
//@access  public
//@usage   Allow user to fetch a post by id
async function getPostById(req, res){
  try {
    const post = await dbGetPostById(req.params.postId);
    return res.send(post);
  } catch (e) {
    return res.status(400).send({
      message: e,
    });
  }
};

//@route   GET /api/post?page=2&limit=10
//@access  public
//@usage   Allow user to search existing posts with different criteria (e.g. pagination, search by title, etc)
async function getPosts(req, res){
  if (!req.query) {
    try {
      const posts = await dbGetPosts();
      return res.send(posts);
    } catch (e) {
      return res.status(500).send({
        message: e,
      });
    }
  }
  try {
    const posts = await dbGetPosts(req.query);
    res.send(posts);
  } catch (e) {
    console.log(e);
    return res.status(500).send({
      message: e,
    });
  }
};

module.exports = {
  addPost,
  getPostById,
  getPosts,
};
