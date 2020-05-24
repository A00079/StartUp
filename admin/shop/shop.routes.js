const router = require('express').Router()
const {isAuth} = require('../middlewares/isAuth')
const shopController = require('../shop/shop.controller')


// POST routes
router.post('/addshop', isAuth, shopController.addShop)
router.post('/shop/:id/addproduct', isAuth, shopController.addShopProduct)

// GET routes
router.get('/shops', isAuth, shopController.getShops)
router.get('/shop/:id',isAuth, shopController.getShop)
router.get('/shop/:id/products', isAuth,shopController.getShopProducts)


// PATCH routes
router.patch('/shop/:id',isAuth, shopController.editShop)
// router.patch('/shop/:id/product/:id', isAuth,shopController.editShopProduct)


// DELETE routes
router.delete('/shop/:id',isAuth, shopController.deleteShop)
// router.delete('/shop/:id/product/:id', isAuth,shopController.deleteShopProduct)


module.exports = router