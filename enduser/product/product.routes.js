const router = require('express').Router()
const productController = require('./product.controller')

// GET routes
router.get('/products', productController.getProducts)
router.get('/product/:id', productController.getProduct)

module.exports = router