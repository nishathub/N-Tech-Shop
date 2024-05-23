const { getAllProducts, createProduct, getOneBrandProducts, getOneProduct } = require('../controllers/brandControllers');
const express = require('express');

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/brand/:brandName', getOneBrandProducts);
router.get('/products/:productId', getOneProduct);
router.post('/products', createProduct);

module.exports = router;
