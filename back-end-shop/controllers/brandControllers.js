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
// Get One Category Products
const getOneCategoryProducts = async (req, res) => {
    try {
        const categoryName = req.params.categoryName;
        const query = { type: categoryName }
        const categoryProducts = await productCollection().find(query).toArray();
        res.send(categoryProducts)
    } catch (error) {
        res.status(500).send(error);
    }
}

const getOneProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const query = { _id: new ObjectId(productId) }
        const oneProduct = await productCollection().findOne(query);
        res.send(oneProduct)
    } catch (error) {
        res.status(500).send(error);
    }
}

const updateProduct = async (req, res) => {
    const productId = req.params.productId;
    const query = { _id: new ObjectId(productId) }
    const options = { upsert: true };
    const newProduct = req.body;
    const { name, brand, color, price, image, rating, type, country, year, warranty, box } = newProduct;
    const updatedProduct = {
        $set: {
            name: name,
            brand: brand,
            color: color,
            price: price,
            image: image,
            rating: rating,
            type: type,
            country: country,
            year: year,
            warranty: warranty,
            box: box
        }
    }

    const result = await productCollection().updateOne(query, updatedProduct, options);
    res.send(result);
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

const getCartItems = async (req, res) => {
    try {
        const products = await cartCollection().find().toArray();
        res.send(products);
    } catch (error) {
        res.status(500).send(error);
    }
}

const getOneCartItem = async (req, res) => {
    try {
        const itemId = req.params.productId;
        const query = { productId: itemId };
        const result = await cartCollection().findOne(query);
        res.send(result);
    } catch (error) {
        console.error(error)
    }
}

const removeCartItem = async (req, res) => {
    try {
        const itemId = req.params.productId;
        const query = { productId: itemId };
        const result = cartCollection().deleteOne(query);
        res.send(result);
    } catch (error) {
        console.error(error)
    }
}

module.exports = { getAllProducts, createProduct, getOneBrandProducts,getOneCategoryProducts, getOneProduct, createCartItem, getCartItems, getOneCartItem, removeCartItem, updateProduct };
