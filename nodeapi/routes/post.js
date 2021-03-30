var express = require("express");
var { getPost, createPost, postedByUser } = require("../controller/post");
var { post } = require("../validation");
var { requireSignIn } = require("../controller/auth");
var { userById } = require("../controller/user");

var router = express.Router();

router.get("/get-all-post", getPost);
router.post(
  "/create-post/new/:userById",
  requireSignIn,
  createPost,
  post.createValidator
);
router.get("/post/by/:userById", requireSignIn, postedByUser);

router.param("userById", userById);

module.exports = router;
