const { getAllProducts, createProduct } = require('../controllers/brandControllers');
const express = require('express');

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', createProduct);

module.exports = router;
