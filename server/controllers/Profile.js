const ProfileModel = require("../model/ProfileModel");
const UserModel = require("../model/UserModel");
const CourseProgressModel = require("../model/CourseProgressModel");
const { uploadImageToloudinary } = require("../utils/ImageUpload");
const CourseModel = require("../model/CourseModel");

exports.UpdateProfile = async (req, res) => {
  try {
    const { dateOfBirth = "", about = "", contactNumber, gender } = req.body;
    const id = req.user.id;
    if (!contactNumber || !gender || !id) {
      return res.status(400).json({ error: "All feild are required" });
    }
    const userDetails = await UserModel.findById(id);
    const profileId = userDetails.additionalDetail;
    const profileDetail = await ProfileModel.findById(profileId);

    profileDetail.dateOfBirth = dateOfBirth;
    profileDetail.about = about;
    profileDetail.contactNumber = contactNumber;
    profileDetail.gender = gender;

    await profileDetail.save();
    return res
      .status(200)
      .json({ message: "Profile updated successfully", profileDetail });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteProfile = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetail = await UserModel.findById(id);
    if (!userDetail) {
      return res.status(400).json({ error: "User not found" });
    }
    await ProfileModel.findByIdAndDelete({ _id: userDetail.additionalDetail });
    await UserModel.findByIdAndDelete({ _id: id });
    return res.status(200).json({ message: "Profile deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getAllDetails = async (req, res) => {
  try {
    const id = req.user.id;
    const userDetail = await UserModel.findById(id).populate(
      "additionalDetail"
    );
    return res.status(200).json({ message: "User details", userDetail });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateDisplayPicture = async (req, res) => {
  try {
    const displayPicture = req.files.displayPicture;
    const userId = req.user.id;
    z;
    const image = await uploadImageToloudinary(
      displayPicture,
      process.env.FOLDER_NAME,
      1000,
      1000
    );
    const updateProfile = await UserModel.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    );
    res.send({
      success: true,
      message: `Image Updated successfully`,
      data: updateProfile,
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id;
    let userDetail = await UserModel.findOne({ _id: userId })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec();
    userDetail = userDetail.toObject();
    var subSectionLength = 0;
    for (var i = 0; i < (userDetail.courses?.length || 0); i++) {
      let totalDurationInSeconds = 0;
      subSectionLength = 0;

      const courseContent = userDetail.courses[i].courseContent || [];
      for (var j = 0; j < courseContent.length; j++) {
        const subSections = courseContent[j].subSection || [];
        totalDurationInSeconds += subSections.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration || 0),
          0
        );
        subSectionLength += subSections.length;
      }

      userDetail.courses[i].totalDuration = convertSecondsToDuration(
        totalDurationInSeconds
      );

      let courseProgressCount = await CourseProgressModel.findOne({
        courseId: userDetail.courses[i]._id,
        userId: userId,
      });
      courseProgressCount = courseProgressCount?.competedVideos?.length || 0;

      userDetail.courses[i].progressPercentage =
        subSectionLength === 0
          ? 100
          : Math.round(
              (courseProgressCount / subSectionLength) * 100 * Math.pow(10, 2)
            ) / Math.pow(10, 2);
    }

    if (!userDetail) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userDetail}`,
      });
    }
    return res.status(200).json({
      success: true,
      data: userDetail.courses || [],
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetail = await CourseModel.find({ instructor: req.user.id });
    const courseData = courseDetail.map((course) => {
      const totalStudentEnrolled = course.studentsEnrolled.length;
      const totalAmountGenerated = totalStudentEnrolled * course.price;

      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        totalStudentEnrolled,
        totalAmountGenerated,
      };
      return courseDataWithStats;
    });
    return res.status(200).json({ courses: courseData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};
