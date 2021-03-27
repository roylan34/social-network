var mongoose = require("mongoose");
var { ObjectId } = mongoose.Schema.Types;

var postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: "Title is required",
      minLength: 3,
      maxLength: 100,
    },
    body: {
      type: String,
      required: "Body is required",
      minLength: 3,
      maxLength: 100,
    },
    photo: {
      data: Buffer,
      contentType: String,
    },
    postedBy: {
      type: ObjectId,
      ref: "User",
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "post" } //force to singular but mongodb by default will add s to become plural
);

module.exports = mongoose.model("Post", postSchema);
