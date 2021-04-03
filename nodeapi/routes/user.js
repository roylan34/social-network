var express = require("express");
var {
  getAllUsers,
  getUser,
  userById,
  hasAuthorization,
  deleteUser,
  updateuser,
} = require("../controller/user");
var { requireSignIn } = require("../controller/auth");

var router = express.Router();

router.get("/users", getAllUsers);
router.get("/user/:userId", requireSignIn, hasAuthorization, getUser);
router.delete("/user/delete/:id", deleteUser);
router.put("/user/update/:userId", requireSignIn, hasAuthorization, updateuser);

//any route containing :userId the app will execute userById() below.
router.param("userId", userById);

module.exports = router;
