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
  updateOneCartItem,
  removeAllCartItems,
  deleteOneCartItem,
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
router.delete("/cartItems/:userEmail", removeAllCartItems);
router.get("/cartItems/:productId", getOneCartItem);
router.patch("/cartItems/:productId", updateOneCartItem);
router.delete("/cart/:productId", deleteOneCartItem);

module.exports = router;
