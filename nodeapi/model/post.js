var mongoose = require("mongoose");

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
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
      },
      name: {
        type: String,
        ref: "Users",
      },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { collection: "post" } //force to singular but mongodb by default will add s to become plural
);

module.exports = mongoose.model("Post", postSchema);
