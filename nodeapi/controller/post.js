var PostModel = require("../model/post");
var UserModel = require("../model/user");
var formidable = require("formidable");
var fs = require("fs");

exports.getPost = (req, res) => {
  const post = PostModel.find().select(["_id", "title", "body"]);
  post
    .then((data) => {
      res.json({ post: data });
    })
    .catch(() => {
      res.status(400).json({ error: "Something went wrong!" });
    });
};

exports.createPost = (req, res) => {
  //handle file upload
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (error, fields, files) => {
    if (error) {
      return res.json({ error: "Image could not be uploaded" });
    }
    let post = new PostModel(fields);
    req.profile.hash_password = undefined;
    req.profile.salt = undefined;
    post.postedBy = req.profile;

    if (files.photo) {
      post.photo.data = fs.readFileSync(files.photo.path);
      post.photo.contentType = files.photo.type;
    }
    post.save((error, result) => {
      if (error) {
        return res.status(400).json({
          error,
        });
      }
      return res.json(result);
    });
  });
};

exports.postsByUser = (req, res) => {
  PostModel.find({ postedBy: req.profile._id })
    .populate("postedBy", "_id name", UserModel)
    .sort("createdAt")
    .exec((error, result) => {
      if (error) {
        return res.status(400).json({ error });
      }

      return res.json(result);
    });
};

exports.postById = (req, res, next, id) => {
  PostModel.findById(id)
    .populate("postedBy", "_id name", UserModel)
    .exec((error, post) => {
      if (error || !post) {
        return res.status(400).json({ error: "Post might not exist" });
      }
      req.post = post;
      next();
    });
};

exports.isPoster = (req, res, next) => {
  const authorized =
    req.post && req.auth && req.post.postedBy._id == req.auth._id;

  if (!authorized) {
    return res.status(403).json({
      error: "User is not allowed to delete this post",
    });
  }
  next();
};

exports.deletePost = (req, res) => {
  let post = req.post;
  post.remove((error, post) => {
    if (error || !post) {
      return res.status(400).json({ error: "Cannot delete post" });
    }
    return res.json({ message: "Post successfully deleted" });
  });
};

exports.updatePost = (req, res) => {
  let post = req.post;
  post.title = req.body.title;
  post.body = req.body.body;

  post.save((error) => {
    if (error) {
      return res
        .status(400)
        .json({ error: "You are not authorized to update post." });
    }

    return res.json({ message: "Successfully update your post", post });
  });
};
