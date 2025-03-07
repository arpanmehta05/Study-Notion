const express = require("express");
const router = express.Router();
const {
  auth,
  isStudent,
  isAdmin,
  isInstructor,
} = require("../middlewares/AuthMiddlewar");
const {
  createRating,
  getAverageRating,
  getAllRating,
} = require("../controllers/RatingAndReview");
const {
  createCaetgory,
  getCategory,
  categoryPageDetails,
} = require("../controllers/Category");
const {
  createCourse,
  getCourses,
  getFullCourseDetails,
  getCourseDetails,
  getInstructorCourses,
  deleteCourse,
  editCourse,
  updateCourseProgress,
} = require("../controllers/Course");
const {
  createSection,
  updateSection,
  deleteSection,
} = require("../controllers/Section");
const {
  createSubsection,
  updateSubsection,
  deleteSubSection,
} = require("../controllers/Subsection");

// ----Course Controllers----
router.post("/createCourse", auth, isInstructor, createCourse);
router.post("/addSection", auth, isInstructor, createSection);
router.post("/updateSection", auth, isInstructor, updateSection);
router.post("/deleteSection", auth, isInstructor, deleteSection);
router.post("/updateSubSection", auth, isInstructor, updateSubsection);
router.post("/deleteSubSection", auth, isInstructor, deleteSubSection);
router.post("/addSubSection", auth, isInstructor, createSubsection);
router.get("/getAllCourses", getCourses);
router.post("/getCourseDetails", getCourseDetails);
router.post("/getFullCourseDetails", auth, getFullCourseDetails);
router.post("/editCourse", auth, isInstructor, editCourse);
router.get("/getInstructorCourses", auth, isInstructor, getInstructorCourses);
router.delete("/deleteCourse", deleteCourse);
router.post("/updateCourseProgress", auth, isStudent, updateCourseProgress);

// ----Category Controllers----
router.post("/createCategory", auth, isAdmin, createCaetgory);
router.get("/showAllCategories", getCategory);
router.post("/getCategoryPageDetails", categoryPageDetails);

// ----Rating Controllers----
router.post("/createRating", auth, isStudent, createRating);
router.get("/getAverageRating", getAverageRating);
router.get("/getReviews", getAllRating);

module.exports = router;
