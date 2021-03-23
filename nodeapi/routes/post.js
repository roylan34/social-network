var express = require("express");
var { getPost, createPost } = require("../controller/post");
var { post } = require("../validation");
var { requireSignIn } = require("../controller/auth");

var router = express.Router();

router.get("/get-all-post", requireSignIn, getPost);
router.post("/create-post", post.createValidator, createPost);

module.exports = router;
