const productController = require('./product.controller');
const router = require('express').Router();
const { isAuth } = require('../middlewares/isAuth')
const { productValidationRules , validate } = require('../../validator')


// GET routes
router.get('/products', productController.getProducts)
router.get('/product/:id', productController.getProduct)

// PATCH routes
router.patch('/product/:id',isAuth, productValidationRules(), validate, productController.editProduct)

// DELETE routes
router.patch('/inactive/:id', isAuth, productController.inactiveProduct)


module.exports = router;