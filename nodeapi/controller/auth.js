var userModel = require("../model/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  const email = req.body.email;
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    //403 forbidden
    return res.status(403).json({
      error: "Email is taken",
    });
  }
  const user = new userModel(req.body);
  user.save();
  return res.json({ message: "Successfuly signup" });
};

exports.signin = async (req, res) => {
  const { email: emailBody, password: passBody } = req.body;
  const user = await userModel.findOne({ email: emailBody });

  if (!user || user.errors) {
    //401 unauthorized
    return res.status(401).json({ error: "User email does not exist." });
  }

  if (!user.authenticate(passBody)) {
    return res.status(401).json({ error: "User and password does not match." });
  }

  //generate token with id, jwt_secret
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  //set cookie to header response as t
  res.cookie("t", token, { expire: new Date() + 9999 });

  const { _id, name, email } = user;
  return res.json({ token, user: { _id, name, email } });
};
