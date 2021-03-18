var express = require("express");
var { getPost, createPost } = require("../controller/post");
var { post } = require("../validation");

var router = express.Router();

router.get("/get-all-post", getPost);
router.post("/create-post", post.createValidator, createPost);

module.exports = router;
