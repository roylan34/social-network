var express = require("express");
var { signup, signin, signout } = require("../controller/auth");
var { auth } = require("../validation");

var router = express.Router();

router.post("/signup", auth.signupValidator, signup);
router.get("/signin", auth.signinValidator, signin);
router.get("/signout", signout);

module.exports = router;
