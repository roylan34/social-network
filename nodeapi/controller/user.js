var userModel = require("../model/user");

exports.userById = (req, res, next, id) => {
  userModel.findById(id).exec((err, dataUser) => {
    if (err || !dataUser) {
      return res.status(400).send({ error: "User not found" });
    }

    //adds profile object in req with dataUser
    req.profile = dataUser;
    next();
  });
};

//Check if logging in user is match to header token and others action need to validate
exports.hasAuthorization = (req, res, next) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;

  // console.log("req.profile ", req.profile, " req.auth ", req.auth);
  // console.log("req.auth typeof", typeof req.auth._id);
  // console.log("req.profile typeof", typeof req.profile._id);

  if (!authorized) {
    return res
      .status(403)
      .send({ error: "User has no authorized to perform this action" });
  }
  next();
};

exports.getAllUsers = (req, res) => {
  userModel
    .find((error, users) => {
      if (error || !users) {
        return res.status(400).json({
          error,
        });
      }

      return res.json({ users });
    })
    .select(["_id", "name", "email", "created_at"]);
};

//get from executed userById()
exports.getUser = (req, res) => {
  //exclude two field during response
  req.profile.hash_password = undefined;
  req.profile.salt = undefined;

  res.send(req.profile);
};

exports.deleteUser = (req, res) => {
  const id = req.params.id;
  userModel.findByIdAndDelete(id, (err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "Id is not exist." });
    }
    return res.json({ message: "User successfully deleted" });
  });
};

exports.updateuser = (req, res) => {
  let user = req.profile;
  user.name = req.body.name;
  user.email = req.body.email;

  user.save((error) => {
    if (error) {
      return res
        .status(400)
        .json({ error: "You are not authorized to update user profile." });
    }
    //exclude from response
    user.salt = undefined;
    user.hash_password = undefined;
    return res.json({ message: "Successfully update profile", user });
  });
};
