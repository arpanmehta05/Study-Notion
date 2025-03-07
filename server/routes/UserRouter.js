const express = require("express");
const {
  Login,
  Signup,
  sendOTP,
  changePassword,
} = require("../controllers/Auth");
const { auth } = require("../middlewares/AuthMiddlewar");
const {
  resetPasswordToken,
  resetPassword,
} = require("../controllers/ResetPassword");

const router = express.Router();

// ---------------------------------login routes----------------------
router.post("/login", Login);
router.post("/signup", Signup);
router.post("/sendotp", sendOTP);
router.post("/changepassowrd", auth, changePassword);
// ---------------------------------login routes----------------------

// ---------------------------------Reset Password routes----------------------
router.post("/reset-password-token", resetPasswordToken);
router.post("/reset-password", resetPassword);
// ---------------------------------Reset Password routes----------------------

module.exports = router;
