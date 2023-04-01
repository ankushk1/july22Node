const express = require("express");
const {
  createCategory,
  getCategories,
  getCategoryById,
  deleteCategoryById,
  updateCategory
} = require("../controller/categoryController");
const { changeQuanity } = require("../controller/productController");
const router = express.Router();
const { validateJwt } = require("../middleware/jwt");

router.post("/createCategory", validateJwt, createCategory);
router.get("/getCategories",validateJwt, getCategories);
router.get("/getCategory/:id",validateJwt, getCategoryById);
router.delete("/deleteCategory/:id", validateJwt,deleteCategoryById);
router.put("/updateCategory/:id", validateJwt, updateCategory);

module.exports = router;
