const { getAllProducts, createProduct, getOneBrandProducts } = require('../controllers/brandControllers');
const express = require('express');

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/products/brand/:brandName', getOneBrandProducts);
router.post('/products', createProduct);

module.exports = router;
