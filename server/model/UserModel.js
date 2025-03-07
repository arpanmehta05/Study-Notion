const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    enum: ["Admin", "Student", "Instructor"],
    required: true,
  },
  additionalDetail: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile",
  },
  courses: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
  },
  image: {
    type: String,
  },
  courseProgerss: [
    { type: mongoose.Schema.Types.ObjectId, ref: "CourseProgress" },
  ],
  token: {
    type: String,
  },
  resetPasswordToken: {
    type: Date,
  },
});

module.exports = mongoose.model("User", UserSchema);
