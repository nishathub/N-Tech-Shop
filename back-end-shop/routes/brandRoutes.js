const { getAllProducts, createProduct, getOneBrandProducts, getOneProduct, createCartItem, getCartItems, removeCartItem, getOneCartItem, updateProduct } = require('../controllers/brandControllers');
const express = require('express');

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/brand/:brandName', getOneBrandProducts);
router.get('/products/:productId', getOneProduct);
router.put('/products/:productId', updateProduct);
router.post('/products', createProduct);
//cart
router.post('/cartItems', createCartItem);
router.get('/cartItems', getCartItems);
router.get('/cartItems/:productId', getOneCartItem);
router.delete('/cartItems/:productId', removeCartItem);


module.exports = router;
