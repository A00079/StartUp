const router = require('express').Router()
const productController = require('./product.controller')
const { isAuth } = require('../middlewares/isAuth')
const { productValidationRules, validate } = require('../../validator')

// GET routes
router.get('/products', isAuth, productController.getAllProducts)
router.get('/product/:id', isAuth, productController.getSingleProduct)

// PATCH routes
router.patch('/product/:id', isAuth, productValidationRules(), validate, productController.editProduct)
router.patch('/togglestock/:id', isAuth, productController.toggleProductStock)
router.patch('/togglelowstock/:id', isAuth, productController.toggleProductLowStock)

// DELETE product
router.delete('/product/:id', isAuth, productController.deleteProduct)

module.exports = router
