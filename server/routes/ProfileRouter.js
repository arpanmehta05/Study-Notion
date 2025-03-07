const express = require("express");
const router = express.Router();

const { auth, isInstructor } = require("../middlewares/AuthMiddlewar");
const {
  deleteProfile,
  UpdateProfile,
  getAllDetails,
  updateDisplayPicture,
  getEnrolledCourses,
  instructorDashboard,
} = require("../controllers/Profile");

router.delete("/deleteProfile", auth, deleteProfile);
router.put("/updateProfile", auth, UpdateProfile);
router.get("/getUserDetails", auth, getAllDetails);

router.get("/getEnrolledCourses",auth,getEnrolledCourses);
router.put("/updateDisplayPicture",auth,updateDisplayPicture);
router.get("/instructorDashboard",auth,isInstructor,instructorDashboard);

module.exports = router;
