const productController = require('./product.controller');
const router = require('express').Router();

// POST routes
router.post('/addproduct', productController.addProduct);

// GET routes
router.get('/products', productController.getProducts)
router.get('/product/:id', productController.getProduct)

// PATCH routes
router.patch('/product/:id', productController.editProduct)

// DELETE routes
router.delete('/product/:id', productController.deleteProduct)


module.exports = router;