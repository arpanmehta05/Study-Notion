const SubSectionModel = require("../model/SubSectionModel");
const SectionModel = require("../model/SectionModel");
const { uploadImageToloudinary } = require("../utils/ImageUpload");
require("dotenv").config();

exports.createSubsection = async (req, res) => {
  try {
    const { sectionId, title, timeDuration, description } = req.body;
    const video = req.files.vidoeFile;
    if (!sectionId || !title || !timeDuration || !description || !video) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const uploadDetais = await uploadImageToloudinary(
      video,
      process.env.FOLDER_NAME
    );

    const SubsectionDetails = await SubSectionModel.create({
      title: title,
      timeDuration: timeDuration,
      description: description,
      videoUrl: uploadDetais.secure_url,
    });
    const section = await SectionModel.findByIdAndUpdate(
      { _id: sectionId },
      { $push: { subSection: SubsectionDetails._id } },
      { new: true }
    ).populate("subSection");
    return res.status(201).json({
      success: true,
      message: "Subsection created successfully",
      section,
    });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.updateSubsection = async (req, res) => {
  try {
    const {sectionId, subSectionId, title} = req.body;
    if (!sectionId || !subSectionId || !title) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const updatedSubSection = await SubSectionModel.findByIdAndUpdate(subSectionId, {title}, {new: true});
    return res.status(200).json({message: "Subsection updated successfully", updatedSubSection});
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId } = req.params;
    await SubSectionModel.findByIdAndDelete(subSectionId);
    return res
      .status(200)
      .json({ message: "Sub - Section deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};
