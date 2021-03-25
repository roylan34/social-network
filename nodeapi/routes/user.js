var express = require("express");
var {
  getAllUsers,
  getUser,
  userById,
  hasAuthorization,
} = require("../controller/user");
var { requireSignIn } = require("../controller/auth");

var router = express.Router();

router.get("/users", getAllUsers);
router.get("/user/:userById", requireSignIn, hasAuthorization, getUser);

//any route containing :userId the app will execute userById() below.
router.param("userById", userById);

module.exports = router;
