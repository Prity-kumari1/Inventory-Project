const express = require("express");
const {signupUser, loginUser, refresh, logout} = require("../controllers/authController");
const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/refresh", refresh);
router.post("/logout", logout);

module.exports = router