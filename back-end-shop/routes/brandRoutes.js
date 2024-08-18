const {
  getAllProducts,
  createProduct,
  getOneBrandProducts,
  getOneCategoryProducts,
  getOneProduct,
  createCartItem,
  getCartItems,
  removeCartItem,
  getOneCartItem,
  updateProduct,
  removeProduct,
} = require("../controllers/brandControllers");

const express = require("express");
const router = express.Router();

router.post("/products", createProduct);
router.get("/products", getAllProducts);
router.get("/products/brand/:brandName", getOneBrandProducts);
router.get("/products/category/:categoryName", getOneCategoryProducts);
router.get("/products/:productId", getOneProduct);
router.put("/products/:productId", updateProduct);
router.delete("/products/:productId", removeProduct);
//cart
router.post("/cartItems", createCartItem);
router.get("/cartItems/:userEmail", getCartItems);
router.get("/cartItems/:productId", getOneCartItem);
router.delete("/cartItems/:productId", removeCartItem);

module.exports = router;
