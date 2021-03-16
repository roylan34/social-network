var express = require("express");
var { getPost, createPost } = require("../controller/post");
var validator = require("../validation");

var router = express.Router();

router.get("/get-all-post", getPost);
router.post("/create-post", validator.post.create, createPost);

module.exports = router;
