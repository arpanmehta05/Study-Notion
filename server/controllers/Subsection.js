const SubSectionModel = require("../model/SubSectionModel");
const SectionModel = require("../model/SectionModel");
const { uploadImageToloudinary } = require("../utils/ImageUpload");
require("dotenv").config();

exports.createSubsection = async (req, res) => {
  try {
    const { sectionId, title, description } = req.body;
    const video = req.files.video;
    if (!sectionId || !title || !description || !video) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    const uploadDetails = await uploadImageToloudinary(
      video,
      process.env.FOLDER_NAME
    );

    const SubsectionDetails = await SubSectionModel.create({
      title: title,
      timeDuration: `${uploadDetails.duration}`,
      description: description,
      videoUrl: uploadDetails.secure_url,
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
    res.status(500).json({
      success: false,
      message: "An error occurred while creating the section",
      error: err,
    });
  }
};

exports.updateSubsection = async (req, res) => {
  try {
    const { sectionId, subSectionId, title, description } = req.body;
    const subSection = await SubSectionModel.findById(subSectionId);
    if (!subSection) {
      return res
        .status(400)
        .json({ success: false, message: "Subsection not found" });
    }
    if (!sectionId || !subSectionId || !title || !description) {
      return res.status(400).json({ error: "All fields are required" });
    }
    if (title !== undefined) {
      subSection.title = title;
    }
    if (description !== undefined) {
      subSection.description = description;
    }
    if (req.files && req.files.video !== undefined) {
      const video = req.files.video;
      const uploadDetails = await uploadImageToloudinary(
        video,
        process.env.FOLDER_NAME
      );
      subSection.videoUrl = uploadDetails.secure_url;
      subSection.timeDuration = `${uploadDetails.duration}`;
    }
    await subSection.save();
    const updatedSubSection = await SubSectionModel.findById(
      subSectionId
    ).populate("subSection");
    return res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: updatedSection,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: "An error occurred while updating the section",
    });
  }
};

exports.deleteSubSection = async (req, res) => {
  try {
    const { sectionId, subSectionId } = req.params;
    await SectionModel.findByIdAndUpdate(
      {
        _id: sectionId,
      },
      {
        $pull: {
          subSection: subSectionId,
        },
      }
    );
    const subSection = await SubSectionModel.findByIdAndDelete({
      _id: subSectionId,
    });
    if (!subSection) {
      return res
        .status(404)
        .json({ success: false, message: "Sub - Section not found" });
    }

    const updatedSection = await SectionModel.findById(sectionId).populate(
      "subSection"
    );
    return res.status(200).json({
      success: true,
      message: "Sub - Section deleted successfully",
      data: updatedSection,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err });
  }
};
