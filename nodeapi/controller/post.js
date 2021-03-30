var PostModel = require("../model/post");
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

exports.postedByUser = (req, res) => {
  PostModel.find({ postedBy: req.profile._id })
    .populate("postedBy", "_id name")
    .sort("createdAt")
    .exec((error, result) => {
      if (error) {
        return res.status(400).json({ error });
      }

      return res.json(result);
    });
};
