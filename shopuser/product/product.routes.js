const router = require('express').Router()
const productController = require('./product.controller')
const { isAuth } = require('../middlewares/isAuth')

// GET routes
router.get('/products', isAuth, productController.getAllProducts)

// PATCH routes
router.patch('/product/:id', isAuth, productController.editProduct)
router.patch('/togglestock/:id', isAuth, productController.toggleProductStock)
router.patch('/togglelowstock/:id', isAuth, productController.toggleProductLowStock)

// DELETE product
router.delete('/product/:id', isAuth, productController.deleteProduct)

module.exports = router
