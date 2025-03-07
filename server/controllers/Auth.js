const UserModel = require("../model/UserModel");
const OTPGenerator = require("otp-generator");
const OTPModel = require("../model/OTPModel");
const ProfileModel = require("../model/ProfileModel");
const bcrypt = require("bcryptjs");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/Mailsender");
const { passwordUpdated } = require("../mail/templates/passwordUpdate");

exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    const checkUser = await UserModel.findOne({ email });

    if (checkUser) {
      return res.status(401).json({
        success: false,
        message: `User is Already Registered`,
      });
    }

    var otp = OTPGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });
    let result = await OTPModel.findOne({ otp: otp });

    while (result) {
      otp = OTPGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
      result = await OTPModel.findOne({ otp: otp });
    }

    const payLoad = { email, otp };
    const newOTP = await OTPModel.create(payLoad);

    res
      .status(200)
      .json({ success: true, newOTP, message: "OTP sent successfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, error: error.message });
  }
};

exports.Signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      otp,
      confirmPassword,
      accountType,
      contactNumber,
    } = req.body;

    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !otp ||
      !confirmPassword
    ) {
      return res.status(403).send({
        success: false,
        message: "All Fields are required",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message:
          "Password and Confirm Password do not match. Please try again.",
      });
    }

    const checkUser = await UserModel.findOne({ email });
    if (checkUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists. Please sign in to continue.",
      });
    }

    const checkOTP = await OTPModel.find({ email })
      .sort({ createdAt: -1 })
      .limit(1);

    if (checkOTP.length === 0) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    } else if (checkOTP[0].otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "The OTP is not valid",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const profileDetail = await ProfileModel.create({
      gender: null,
      dateOfBirth: null,
      dateOfBirth: null,
      contactNumber: null,
    });

    const user = await UserModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      accountType: accountType,
      contactNumber,
      additionalDetail: profileDetail._id,
      image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`,
    });
    return res.status(200).json({
      success: true,
      user,
      message: "User registered successfully",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered. Please try again.",
    });
  }
};

exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: `Please Fill up All the Required Fields`,
      });
    }
    const user = await UserModel.findOne({ email }).populate(
      "additionalDetail"
    );
    if (!user) {
      return res.status(401).json({
        success: false,
        message: `User is not Registered with Us Please SignUp to Continue`,
      });
    }

    if (await bcrypt.compare(password, user.password)) {
      const payLoad = {
        email: user.email,
        id: user._id,
        accountType: user.accountType,
      };
      const token = jwt.sign(payLoad, process.env.JWT_SECRET, {
        expiresIn: "2h",
      });
      user.token = token;
      user.password = undefined;
      const options = {
        expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        user,
        token,
        message: "User logged in successfully",
      });
    } else {
      return res.status(401).json({
        success: false,
        message: `Password is incorrect`,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: `Login Failure Please Try Again`,
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const userDetails = await UserModel.findById(req.user.id);
    const { oldPassword, newPassword } = req.body;
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    );
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user.id,
      { password: hashedPassword },
      { new: true }
    );

    try {
      const emailResponse = await mailSender(
        updatedUser.email,
        "Password for Your account has been updated",
        passwordUpdated(
          updatedUser.email,
          `Password upadated successfully for your account ${updatedUser.email}`
        )
      );
    } catch (err) {
      console.error("Error occurred while sending email:", err);
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: err.message,
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
