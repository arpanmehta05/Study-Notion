const UserModel = require("../model/UserModel");
const mailSender = require("../utils/Mailsender");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

exports.resetPasswordToken = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const token = crypto.randomUUID();

    const updatedUser = await UserModel.findOneAndUpdate(
      {
        email: email,
      },
      {
        token: token,
        resetPasswordToken: Date.now() + 3600000,
      },
      {
        new: true,
      }
    );

    const url = `http://localhost:5173/update-password/${token}`;

    await mailSender(email, "Password Reset", url);

    return res.status(200).json({ message: "Email sent" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords don't match" });
    }
    const userDetail = await UserModel.findOne({ token: token });
    if (!userDetail) {
      return res.status(404).json({ message: "Invalid token" });
    }
    if (userDetail.resetPasswordToken < Date.now()) {
      return res.status(400).json({ message: "Token expired" });
    }

    const hashedPassowrd = await bcrypt.hash(password, 10);

    await UserModel.findOneAndUpdate(
      {
        token: token,
      },
      {
        password: hashedPassowrd,
      },
      {
        new: true,
      }
    );
    return res.status(200).json({ message: "Password updated" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
