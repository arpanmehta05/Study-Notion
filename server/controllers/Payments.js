const {
  paymentSuccessEmail,
} = require("../mail/templates/paymentSuccessEmail");
const mailSender = require("../utils/mailSender");
const UserModel = require("../model/UserModel");
const CourseModel = require("../model/CourseModel");
const { instance } = require("../config/razorpay");
const mongoose = require("mongoose");

exports.capturePayment = async (req, res) => {
  try {
    const { course_id } = req.body;
    const userId = req.user.id;

    if (!course_id) {
      return res.status(400).json({ msg: "Course ID is required" });
    }

    let course;
    try {
      course = await CourseModel.findById(course_id);
      if (!course) {
        return res.status(404).json({ msg: "Course not found" });
      }
      const uid = new mongoose.Types.ObjectId(userId);
      if (course.studentsEnroled.includes(uid)) {
        return res
          .status(200)
          .json({ success: false, message: "Student is already Enrolled" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }

    const amount = course.price;
    const currency = "INR";

    const options = {
      amount: amount * 100,
      currency,
      receipt: Math.random(Date.now()).toString(),
      notes: {
        courseId: course_id,
        userId,
      },
    };
    try {
      const payment = await instance.orders.create(options);
      console.log(payment);
      return res.status(200).json({
        success: true,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        thumbnail: course.thumbnail,
        orderId: payment.id,
        amount: payment.amount,
        currency: payment.currency,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.verifySignature = async (req, res) => {
  try {
    const webSecret = "12345678";
    const signature = req.headers["x-razorpay-signature"];

    const shasum = crypto.createHmac("sha256", webSecret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest("hex");

    if (signature === digest) {
      console.log("Payment is authenticated");
      const { courseId, userId } = req.body.payload.payment.entity.notes;
      try {
        const enrolledCourse = await CourseModel.findByIdAndUpdate(
          { _id: courseId },
          { $push: { studentsEnrolled: userId } },
          { new: true }
        );
        if (!enrolledCourse) {
          return res.status(400).json({ message: "Course not found" });
        }
        console.log(enrolledCourse);

        const enrolledStudent = await UserModel.findByIdAndUpdate(
          { _id: userId },
          { $push: { courses: courseId } },
          { new: true }
        );
        console.log(enrolledStudent);
        const emailResponse = await mailSender(
          enrolledStudent.email,
          "Congratulation on your Enrollment",
          "Payment Success"
        );
        console.log(emailResponse);
        return res.status(200).json({ message: "Payment Success" });
      } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
      }
    } else {
      return res.status(400).json({ message: "Payment not authenticated" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
