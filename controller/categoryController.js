const Category = require("../model/Category");

exports.createCategory = async (req, res) => {
  try {
    // Check if category exists or not
    const category = await Category.findOne({ name: req.body.name });

    if (category) {
      return res.status(400).json({ message: "Category Already exists" });
    }

    await Category.create(req.body);

    return res.status(200).json({ message: "Category created successfully" });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

exports.getCategories = async (req, res) => {
  try {
    // Find all categories
    // if not found or no categories, return message no categories found
    // return arr of category objects

    const categories = await Category.find();

    if (!categories.length) {
      return res.status(400).json({
        message: "No categories found"
      });
    }
    return res.status(200).json({
      categories
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    // Id of the product

    const { id } = req.params;

    const category = await Category.findById(id);

    if (!category) {
      return res.status(400).json({
        message: "No category found"
      });
    }
    return res.status(200).json({
      category
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};


exports.deleteCategoryById = async (req, res) => {
  try {
    // Id of the product
    const { id } = req.params;

    const category = await Category.findByIdAndDelete(id);
    console.log(category)

    if (!category) {
      return res.status(400).json({
        message: "No category found to delete"
      });
    }
    return res.status(200).json({
      message: "Category deleted Successfully"
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
