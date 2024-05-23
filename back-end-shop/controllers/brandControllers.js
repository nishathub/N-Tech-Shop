const { ObjectId } = require("mongodb");
const { getDB } = require("../config/db");

const productCollection = () => getDB().collection('Products'); // modified to a function and will be called later.
const cartCollection = () => getDB().collection('Cart'); // modified to a function and will be called later.

const getAllProducts = async (req, res) => {
    try {
        const products = await productCollection().find().toArray();
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
}
const getCartProducts = async (req, res) => {
    try {
        const products = await cartCollection().find().toArray();
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

const getOneProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const query = { _id : new ObjectId(productId)}
        const oneProduct = await productCollection().findOne(query);
        res.send(oneProduct)
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

const createCartItem = async (req, res) => {
    try {
        const newCartItem = req.body;
        const result = await cartCollection().insertOne(newCartItem);
        res.send(result);
    } catch (error) {
        res.status(500).send(error);
    }
}

module.exports = { getAllProducts, createProduct, getOneBrandProducts, getOneProduct, createCartItem, getCartProducts };
