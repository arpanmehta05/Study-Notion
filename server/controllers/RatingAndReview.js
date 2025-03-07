const RatingAndReviewModel = require("../model/RatingAndReviewModel");
const CourseModel = require("../model/CourseModel");
const { default: mongoose } = require("mongoose");

exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rating, review, courseId } = req.body;
    const courseDetail = await CourseModel.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });
    if (!courseDetail) {
      return res
        .status(400)
        .json({ message: "Student is not enrolled in this course" });
    }
    const alreadyRated = await RatingAndReviewModel.findOne({
      user: userId,
      course: courseId,
    });
    if (alreadyRated) {
      return res
        .status(400)
        .json({ message: "You have already rated this course" });
    }
    const ratingReview = await RatingAndReviewModel.create({
      rating,
      review,
      course: courseId,
      user: userId,
    });

    const updatedDetail = await CourseModel.findOneAndUpdate(
      { _id: courseId },
      {
        $push: {
          ratingAndReviews: ratingReview._id,
        },
      },
      { new: true }
    );
    console.log(updatedDetail);
    return res
      .status(200)
      .json({ message: "Rating and review added", ratingReview });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getAverageRating = async (req, res) => {
  try {
    const courseId = req.body.courseId;
    const result = await RatingAndReviewModel.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);
    if (result.length > 0) {
      return res
        .status(200)
        .json({ success: true, averageRating: result[0].averageRating });
    }
    return res.status(200).json({ success: true, averageRating: 0 });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getAllRating = async (req, res) => {
  try {
    const allReview = await RatingAndReviewModel.find({})
      .sort({
        rating: "desc",
      })
      .populate({
        path: "user",
        select: "firsName lastName email image",
      })
      .populate({
        path: "course",
        select: "courseName",
      })
      .exec();

    return res.status(200).json({ success: true, allReview });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
