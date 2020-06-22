const router = require('express').Router()
const productController = require('./product.controller')
const { isAuth } = require('../middlewares/isAuth')
const { productValidationRules, validate } = require('../../validator')

// GET routes
router.get('/products', isAuth, productController.getAllProducts)
router.get('/product/:id', isAuth, productController.getSingleProduct)
router.get('/inactive', isAuth, productController.getInActiveProducts)
router.get('/units', isAuth, productController.getUnits)

// POST routes
router.post('/product', isAuth, productController.addProduct)

// PATCH routes
router.patch('/product/:id', isAuth, productController.editProduct)
router.patch('/productsprice/:id', isAuth, productController.editProductsPrice)
router.patch('/inactivate/:id', isAuth, productController.inActivateProduct)
router.patch('/activate/:id', isAuth, productController.activateProduct)
router.patch('/togglestock/:id', isAuth, productController.toggleProductStock)
router.patch('/togglesstock/:id', isAuth, productController.toggleProductSStock)
router.patch('/togglemstock/:id', isAuth, productController.toggleProductMStock)
router.patch('/togglelstock/:id', isAuth, productController.toggleProductLStock)
router.patch('/togglelowstock/:id', isAuth, productController.toggleProductLowStock)


module.exports = router
