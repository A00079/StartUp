const router = require('express').Router()
const { isAuth } = require('../middlewares/isAuth')
const shopController = require('../shop/shop.controller')
const { productValidationRules, shopValidationRules, validate } = require('../../validator')

// POST routes
router.post('/addshop', isAuth,shopValidationRules(), validate, shopController.addShop)
router.post('/shop/:id/addproduct', productValidationRules(), validate, isAuth, shopController.addShopProduct)

// GET routes
router.get('/shops', isAuth, shopController.getShops)
router.get('/shop/:id', isAuth, shopController.getShop)
router.get('/shop/:id/products', isAuth, shopController.getShopProducts)

// PATCH routes
router.patch('/shop/:id', shopValidationRules(), validate, isAuth, shopController.editShop)
router.patch('/status/:id', isAuth, shopController.editShopStatus)
// router.patch('/shop/:id/product/:id', productValidationRules(),validate, isAuth,shopController.editShopProduct)

// DELETE routes
router.delete('/shop/:id', isAuth, shopController.deleteShop)
// router.delete('/shop/:id/product/:id', isAuth,shopController.deleteShopProduct)

module.exports = router