const CourseModel = require("../model/CourseModel");
const UserModel = require("../model/UserModel");
const SectionModel = require("../model/SectionModel");
const SubSectionModel = require("../model/SubSectionModel");
const { uploadImageToloudinary } = require("../utils/ImageUpload");
const CategoryModel = require("../model/CategoryModel");
const CourseProgressModel = require("../model/CourseProgressModel");

exports.createCourse = async (req, res) => {
  try {
    const {
      courseName,
      courseDescription,
      tag,
      whatYouWillLearn,
      price,
      Category,
      courseRequirements,
    } = req.body;
    const thumbnail = req.files.thumbnail;
    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !Category ||
      !thumbnail
    ) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const userId = req.user.id;
    const instructorDetails = await UserModel.findById(userId);
    if (!instructorDetails) {
      return res.status(404).json({ message: "Instructor not found" });
    }
    const CategoryDetails = await CategoryModel.findById(Category);
    if (!CategoryDetails) {
      return res.status(404).json({ message: "Category not found" });
    }

    const thumbnailImage = await uploadImageToloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );
    let instructions = [];
    if (courseRequirements) {
      try {
        instructions =
          typeof courseRequirements === "string"
            ? JSON.parse(courseRequirements)
            : courseRequirements;
      } catch (e) {
        console.log("Error parsing course requirements:", e);
        instructions = courseRequirements ? [courseRequirements] : [];
      }
    }
    let parsedTags = [];
    if (tag) {
      try {
        parsedTags = typeof tag === "string" ? JSON.parse(tag) : tag;
      } catch (e) {
        console.log("Error parsing tags:", e);
        parsedTags = tag ? [tag] : [];
      }
    }

    const newCourse = await CourseModel.create({
      courseName,
      courseDescription,
      instructor: instructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      Category: CategoryDetails._id,
      thumbnail: thumbnailImage.secure_url,
      tag: parsedTags,
      instructions,
      status: "Published",
    });

    await UserModel.findByIdAndUpdate(
      { _id: instructorDetails._id },
      {
        $push: { course: newCourse._id },
      },
      { new: true }
    );

    await CategoryModel.findByIdAndUpdate(
      { _id: CategoryDetails._id },
      {
        $push: { course: newCourse._id },
      },
      { new: true }
    );

    return res.status(201).json({
      Success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (err) {
    console.error("Error creating course:", err);
    return res.status(500).json({ message: err.message });
  }
};

exports.getCourses = async (req, res) => {
  try {
    const courses = await CourseModel.find({});
    return res.status(200).json({ Success: true, data: courses });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;
    const courseDetails = await CourseModel.findById(courseId)
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetail",
        },
      })
      .populate("Category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    if (!courseDetails) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    return res.status(200).json({ success: true, data: courseDetails });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.getCourseDetails = async (req, res) => {
  try {
    const { courseID } = req.body;
    const courseDetails = await CourseModel.findOne({ _id: courseID })
      .populate({ path: "instructor", populate: { path: additionalDetail } })
      .populate("Category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: { path: "subSection", select: "-videoUrl" },
      })
      .exec();
    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseID}`,
      });
    }
    let totalDurationInSeconds = 0;
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration);
        totalDurationInSeconds += timeDurationInSeconds;
      });
    });
    const totalDuration = convertSecondsToDuration(totalDurationInSeconds);

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorID = req.user.id;

    const instructorCourses = await CourseModel.find({
      instructor: instructorID,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: instructorCourses,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: err.message,
    });
  }
};

exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    const course = await CourseModel.findById(courseId);
    if (!course) {
      return res
        .status(404)
        .json({ success: false, message: "Course not found" });
    }
    const studentsEnrolled = course.studentsEnrolled;
    for (const studentId of studentsEnrolled) {
      await UserModel.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      });
    }
    const courseSection = course.courseContent;
    for (const sectionId of courseSection) {
      const section = await SectionModel.findById(sectionId);
      if (section) {
        const subsection = section.subSection;
        for (const subSectionId of subsection) {
          await SubSectionModel.findByIdAndDelete(subSectionId);
        }
      }
      await SectionModel.findByIdAndDelete(sectionId);
    }
    await CategoryModel.findByIdAndUpdate(
      { _id: course.Category },
      { $pull: { course: courseId } },
      { new: true }
    );
    await CourseModel.findByIdAndDelete(courseId);
    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
};

exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body;
    const updates = req.body;
    const course = await CourseModel.findById(courseId);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }
    if (req.files && req.files.thumbnailImage) {
      console.log("Updating thumbnail");
      const thumbnail = req.files.thumbnailImage;
      const thumbnailImage = await uploadImageToloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      );
      course.thumbnail = thumbnailImage.secure_url;
    }
    for (const key in updates) {
      if (updates.hasOwnProperty(key) && key !== "courseId") {
        if (
          key === "tag" ||
          key === "instructions" ||
          key === "courseRequirements"
        ) {
          try {
            if (key === "courseRequirements") {
              course.instructions = JSON.parse(updates[key]);
            } else if (key === "instructions") {
              course.instructions = JSON.parse(updates[key]);
            } else {
              course[key] = JSON.parse(updates[key]);
            }
          } catch (e) {
            console.log(`Error parsing ${key}:`, e);
            course[key] = updates[key];
          }
        } else if (key !== "thumbnailImage") {
          course[key] = updates[key];
        }
      }
    }

    await course.save();

    const updatedCourse = await CourseModel.findOne({ _id: courseId })
      .populate({
        path: "instructor",
        populate: {
          path: "additionalDetail",
        },
      })
      .populate("Category")
      .populate("ratingAndReviews")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();

    res.json({ success: true, data: updatedCourse });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
};

exports.updateCourseProgress = async (req, res) => {
  const { courseId, subSectionId } = req.body;
  const userId = req.user.id;
  try {
    const subSection = await SubSectionModel.findById(subSectionId);
    if (!subSection) {
      return res.status(404).json({ message: "Subsection not found" });
    }
    let CourseProgress = await CourseProgressModel.findOne({
      courseId: courseId,
      userId: userId,
    });
    if (!CourseProgress) {
      return res.status(404).json({ message: "Course Progress not found" });
    } else {
      if (CourseProgress.competedVideos.includes(subSectionId)) {
        return res.status(400).json({ message: "Already Completed" });
      }
      CourseProgress.competedVideos.push(subSectionId);
    }
    await CourseProgress.save();
    return res.status(200).json({
      success: true,
      message: "Course Progress updated successfully",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error: err.message });
  }
};
