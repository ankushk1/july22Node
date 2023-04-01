const Category = require("../model/Category");

exports.createCategory = async (req, res) => {
  try {
    // Check if category exists or not
    const category = await Category.findOne({ name: req.body.name });

    if (category) {
      return res.status(400).json({ message: "Category Already exists" });
    }

    await Category.create({
      ...req.body,
      createdBy: req.body.userId,
      updatedBy: req.body.userId
    });

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

    const categories = await Category.find()
    .populate('createdBy', 'email firstname role')
    .populate('updatedBy', 'email firstname');

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

exports.updateCategory = async (req, res) => {
  try {
    // Id of the product
    const { id } = req.params;

    const updatedCategory = await Category.findByIdAndUpdate(id, {
      $set: {...req.body, updatedBy : req.body.userId}
    });

    if (!updatedCategory) {
      return res.status(400).json({
        message: "No category found to update"
      });
    }

    return res.status(200).json({
      message: "Category updated Successfully"
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

// Set category isActive to False

// exports.deactivateCategory = async (req, res) => {

// }
