const express = require("express");
const {
  createProduct,
  getProducts,
  deleteProductById,
  updateProduct,
  changeQuanity,
  getProductById
} = require("../controller/productController");
const router = express.Router();
const { validateJwt } = require("../middleware/jwt");

router.post("/createProduct", validateJwt, createProduct);
router.get("/getProducts", validateJwt, getProducts);
router.get("/getProductById/:id", validateJwt, getProductById);
router.delete("/deleteProductById/:id", validateJwt,deleteProductById);
router.put("/updateProduct/:id", validateJwt, updateProduct);
router.put("/updateQuantity/:id", validateJwt, changeQuanity);


module.exports = router;

