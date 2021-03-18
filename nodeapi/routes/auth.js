var express = require("express");
var { signup } = require("../controller/auth");
var { auth } = require("../validation");

var router = express.Router();

router.post("/signup", auth.signupValidator, signup);

module.exports = router;
