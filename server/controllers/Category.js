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
    return res.status(200).json({ success: true, data: Category });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;
    console.log("PRINTING CATEGORY ID: ", categoryId);
    const selectedCategory = await CategoryModel.findById(categoryId)
      .populate({
        path: "course",
        match: { status: "Published" },
        populate: "ratingAndReviews",
      })
      .exec();
    
    if (!selectedCategory) {
      console.log("Category not found.");
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    let responseData = {
      selectedCategory,
      categoriesExceptSelected: [],
      differentCategory: null,
      mostSellingCourses: [],
      hasError: selectedCategory.course.length === 0,
      message: selectedCategory.course.length === 0 ? 
        "No courses found for the selected category." : ""
    };
    if (selectedCategory.course.length > 0) {
      const categoriesExceptSelected = await CategoryModel.find({
        _id: { $ne: categoryId },
      });
      responseData.categoriesExceptSelected = categoriesExceptSelected;
      if (categoriesExceptSelected.length > 0) {
        const randomIndex = getRandomInt(categoriesExceptSelected.length);
        const differentCategory = await CategoryModel.findById(
          categoriesExceptSelected[randomIndex]._id
        )
          .populate({
            path: "course",
            match: { status: "Published" },
          })
          .exec();
          
        responseData.differentCategory = differentCategory;
      }
      const allCategories = await CategoryModel.find()
        .populate({
          path: "course",
          match: { status: "Published" },
          populate: {
            path: "instructor",
          },
        })
        .exec();
        
      const allCourses = allCategories.flatMap((category) => category.course);
      responseData.mostSellingCourses = allCourses
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 10);
    }
    
    return res.status(200).json({
      success: true,
      data: responseData
    });
  } catch (err) {
    console.error("Error in categoryPageDetails:", err);
    return res.status(500).json({
      success: false,
      message: "Error retrieving category details",
      error: err.message,
    });
  }
};
