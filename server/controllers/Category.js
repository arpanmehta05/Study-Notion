const CategoryModel = require("../model/CategoryModel");
const { Mongoose } = require("mongoose");
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
exports.createCaetgory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }
    const Category = await CategoryModel.create({
      name: name,
      description: description,
    });
    return res.status(201).json({
      Success: true,
      message: "Category created successfully",
      Category: Category,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getCategory = async (req, res) => {
  try {
    const Category = await CategoryModel.find({});
    return res.status(200).json({ Success: true, Category: Category });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const selectedCategory = await CategoryModel.findById(categoryId)
      .populate("course")
      .exec();
    if (!selectedCategory) {
      return res.status(400).json({ message: "Category not found" });
    }
    const diffrentCategory = await CategoryModel.find({
      _id: { $ne: categoryId },
    })
      .populate("course")
      .exec();
    const allCategories = await CategoryModel.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: {
          path: "instructor",
        },
      })
      .exec();
    const allCourses = allCategories.flatMap((category) => category.course);
    const mostSellingCourses = allCourses
      .sort((a, b) => b.sold - a.sold)
      .slice(0, 10);
    return res.status(200).json({
      success: true,
      data: { selectedCategory, diffrentCategory, mostSellingCourses },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
