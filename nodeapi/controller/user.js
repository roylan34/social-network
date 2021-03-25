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

exports.hasAuthorization = (req, res, next) => {
  const authorized =
    req.profile && req.auth && req.profile._id === req.auth._id;

  //console.log("req.profile ", req.profile, " req.auth ", req.auth);

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