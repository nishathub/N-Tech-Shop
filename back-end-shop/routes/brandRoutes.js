const { getAllProducts, createProduct } = require('../controllers/brandControllers');
const express = require('express');

const router = express.Router();

router.get('/products', getAllProducts);
router.post('/products', createProduct);

module.exports = router;
