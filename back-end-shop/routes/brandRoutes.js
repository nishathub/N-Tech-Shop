const { getAllProducts, createProduct, getOneBrandProducts, getOneProduct, createCartItem, getCartProducts } = require('../controllers/brandControllers');
const express = require('express');

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/cartItems', getCartProducts);
router.get('/products/brand/:brandName', getOneBrandProducts);
router.get('/products/:productId', getOneProduct);
router.post('/products', createProduct);
router.post('/cartItems', createCartItem);


module.exports = router;
