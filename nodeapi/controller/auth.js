var userModel = require("../model/user");

exports.signup = async (req, res) => {
  const email = req.body.email;
  const userExists = await userModel.findOne({ email });
  if (userExists) {
    //403 authorized
    return res.status(403).json({
      error: "Email is taken",
    });
  }
  const user = await new userModel(req.body);
  user.save();
  return res.json({ message: "Successfuly signup" });
};
