const mongoose = require("mongoose");
const mailSender = require("../utils/Mailsender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
    expires: 10 * 60,
  },
});

const sendVerificationMail = async (email, otp) => {
  try {
    const mailResponse = await mailSender(email,"Verification Email",emailTemplate(otp));
    console.log(mailResponse);
  } catch (err) {
    console.log(err.message);
    throw err;
  }
};

OTPSchema.pre("save", async function (next) {
    await sendVerificationMail(this.email, this.otp);
    next();
});

module.exports = mongoose.model("OTP", OTPSchema);
