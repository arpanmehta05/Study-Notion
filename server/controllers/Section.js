const SectionModel = require("../model/SectionModel");
const SubSectionModel = require("../model/SubSectionModel");
const CourseModel = require("../model/CourseModel");

exports.createSection = async (req, res) => {
  try {
    const { sectionName, courseId } = req.body;
    if (!sectionName || !courseId) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const newSection = await SectionModel.create({ sectionName });
    const updatedCourse = await CourseModel.findByIdAndUpdate(
      courseId,
      {
        $push: { courseContent: newSection._id },
      },
      { new: true }
    ).populate({
      path: "courseContent",
      populate: {
        path: "subSection",
      },
    });
    return res.status(201).json({
      success: true,
      message: "Section created successfully",
      updatedCourse,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const { sectionName, sectionId, courseId } = req.body;
    if (!sectionName || !sectionId || !courseId) {
      return res
        .status(400)
        .json({ success: false, error: "All fields are required" });
    }
    await SectionModel.findByIdAndUpdate(
      sectionId,
      { sectionName },
      { new: true }
    );
    const updatedCourse = await CourseModel.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    
    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      updatedCourse,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};

exports.deleteSection = async (req, res) => {
  try {
    const { sectionId, courseId } = req.body;
    await CourseModel.findByIdAndUpdate(courseId, {
      $pull: { courseContent: sectionId },
    });
    const section = await SectionModel.findById(sectionId);
    if (!section) {
      return res
        .status(404)
        .json({ success: false, message: "Section not found" });
    }
    await SubSectionModel.deleteMany({ _id: { $in: section.subSection } });
    await SectionModel.findByIdAndDelete(sectionId);
    const course = await CourseModel.findById(courseId)
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      })
      .exec();
    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
      data: course,
    });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
