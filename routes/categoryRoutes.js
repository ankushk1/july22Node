const express = require("express");
const {
  createCategory,
  getCategories,
  getCategoryById,
  deleteCategoryById
} = require("../controller/categoryController");
const router = express.Router();
const { validateJwt } = require("../middleware/jwt");

router.post("/createCategory", createCategory);
router.get("/getCategories", getCategories);
router.get("/getCategory/:id", getCategoryById);
router.delete("/deleteCategory/:id", deleteCategoryById);

module.exports = router;
