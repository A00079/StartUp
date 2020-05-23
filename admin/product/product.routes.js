const productController = require('./product.controller');
const router = require('express').Router();
const { isAuth } = require('../middlewares/isAuth')


// GET routes
router.get('/products', productController.getProducts)
router.get('/product/:id', productController.getProduct)

// PATCH routes
router.patch('/product/:id', isAuth,productController.editProduct)

// DELETE routes
router.delete('/product/:id',isAuth, productController.deleteProduct)


module.exports = router;