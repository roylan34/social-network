var mongoose = require("mongoose");
var uuid = require("uuid/v4");
var crypto = require("crypto");

var userSchema = mongoose.Schema({
  name: {
    type: String,
    require: true,
    trim: true,
  },
  email: {
    type: String,
    require: true,
    trim: true,
  },
  hash_password: {
    type: String,
    require: true,
  },
  salt: String,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: Date,
});

//virtual field
userSchema
  .virtual("password")
  .set(function (password) {
    //temporary variable _password
    this._password = password;

    //generate timestamp as secret key or create
    //ur own salt to easily decrypt for future retrieving plain text password
    this.salt = uuid();

    //store encrypted password to collection User
    this.hash_password = this.encrpytPassword(password);
  })
  .get(function () {
    return this._password;
  });

//methods
userSchema.methods = {
  encrpytPassword: function (password) {
    if (!password) return "";

    try {
      const hashed_pass = crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");

      return hashed_pass;
    } catch (error) {
      return "";
    }
  },
};
module.exports = mongoose.model("user", userSchema);
