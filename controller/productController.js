const Product = require("../model/Product");

exports.createProduct = async (req, res) => {
  try {
    // Check if product exists or not
    const product = await Product.findOne({ name: req.body.name });

    if (product) {
      return res.status(400).json({ message: "Product Already exists" });
    }

    await Product.create({
      ...req.body,
      createdBy: req.body.userId,
      updatedBy: req.body.userId
    });

    return res.status(200).json({ message: "Product created successfully" });
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ quantity: { $gt: 0 } })
      .populate("category", " name description")
      .populate("createdBy", "email firstname role")
      .populate("updatedBy", "email firstname");

    if (!products.length) {
      return res.status(400).json({
        message: "No products found"
      });
    }
    return res.status(200).json({
      products
    });
  } catch (err) {
    res.status(500).json({ err });
  }
};

exports.deleteProductById = async (req, res) => {
  try {
    // Id of the product
    const { id } = req.params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return res.status(400).json({
        message: "No product found to delete"
      });
    }
    return res.status(200).json({
      message: "Product deleted Successfully"
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    // Id of the product
    const { id } = req.params;

    const updatedProduct = await Product.findByIdAndUpdate(id, {
      $set: { ...req.body, updatedBy: req.body.userId }
    });

    if (!updatedProduct) {
      return res.status(400).json({
        message: "No product found to update"
      });
    }

    return res.status(200).json({
      message: "Product updated Successfully"
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

exports.changeQuanity = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(typeof req.body.quantity);

    const updatedProduct = await Product.findByIdAndUpdate(id, {
      $inc: {
        quantity: -req.body.quantity
      }
    });
    console.log(updatedProduct);

    if (!updatedProduct) {
      return res.status(400).json({
        message: "No product found to update"
      });
    }

    return res.status(200).json({
      message: "Quantity updated Successfully"
    });
  } catch (err) {
    return res.status(500).json({ err });
  }
};
