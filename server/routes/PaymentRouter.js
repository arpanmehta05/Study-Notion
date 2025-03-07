const express = require("express");
const router = express.Router();
const { auth, isStudent } = require("../middlewares/AuthMiddlewar");
const {verifySignature, capturePayment }= require("../controllers/Payments")

router.post("/capturePayment", auth, isStudent, capturePayment);
router.post("/verifyPayment", auth, isStudent, verifySignature);
// router.post("/sendPaymentSuccessEmail",auth,isStudent,);

module.exports = router;
