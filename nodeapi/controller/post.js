var PostModel = require("../model/post");

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
  const title = req.body.title;
  const body = req.body.body;
  let post = new PostModel({ title, body });
  post.save();
  res.send(post);
};
