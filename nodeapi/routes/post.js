var express = require("express");
var {
  getPost,
  createPost,
  postsByUser,
  postById,
  isPoster,
  deletePost,
} = require("../controller/post");
var { post } = require("../validation");
var { requireSignIn } = require("../controller/auth");
var { userById } = require("../controller/user");

var router = express.Router();

router.get("/get-all-post", getPost);
router.post(
  "/create-post/new/:userId",
  requireSignIn,
  createPost,
  post.createValidator
);
router.get("/post/by/:userId", requireSignIn, postsByUser);
router.delete("/post/delete/:postId", requireSignIn, isPoster, deletePost);

//any route containing :userId the app will execute userById() below.
router.param("userId", userById);

//any route containing :postId the app will execute postById() below.
router.param("postId", postById);

module.exports = router;
