const { getDB } = require("../config/db");

const productCollection = () => getDB().collection('Products'); // modified to a function and will be called later.

const getAllProducts = async (req, res) => {
    try {
        const products = await productCollection().find().toArray();
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
}

// Get One brand Products
const getOneBrandProducts = async (req, res) => {
    try {
        const brandName = req.params.brandName;
        const query = { brand: brandName }
        const brandProducts = await productCollection().find(query).toArray();
        res.send(brandProducts)
    } catch (error) {
        res.status(500).send(error);
    }
}

const createProduct = async (req, res) => {
    try {
        const newProduct = req.body;
        const result = await productCollection().insertOne(newProduct);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = { getAllProducts, createProduct, getOneBrandProducts };
