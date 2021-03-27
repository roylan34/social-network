var express = require("express");
var {
  getAllUsers,
  getUser,
  userById,
  hasAuthorization,
  deleteUser,
} = require("../controller/user");
var { requireSignIn } = require("../controller/auth");

var router = express.Router();

router.get("/users", getAllUsers);
router.get("/user/:userById", requireSignIn, hasAuthorization, getUser);
router.delete("/delete-user/:id", deleteUser);

//any route containing :userId the app will execute userById() below.
router.param("userById", userById);

module.exports = router;
