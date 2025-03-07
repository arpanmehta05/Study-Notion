const SectionModel = require("../model/SectionModel");
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
    return res
      .status(201)
      .json({ message: "Section created successfully", updatedCourse });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.updateSection = async (req, res) => {
  try {
    const {sectionName , sectionId} = req.body;
    if (!sectionName || !sectionId) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const updatedSection = await SectionModel.findByIdAndUpdate(sectionId, {sectionName}, {new: true});
    return res.status(200).json({message: "Section updated successfully", updatedSection});
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteSection = async (req, res) => {
    try{
        const {sectionId} = req.body;
        await SectionModel.findByIdAndDelete(sectionId);
        return res.status(200).json({message: "Section deleted successfully"});
    }
    catch(err){
        return res.status(500).json({error: err.message});
    }
};