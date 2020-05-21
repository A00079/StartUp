const router = require('express').Router()
const shopController = require('./shop.controller')
const { isAuth } = require('../middlewares/isAuth')

// GET routes
router.get('/profile', isAuth, shopController.shopProfile)
router.get('/products', isAuth, shopController.getAllProducts)

// PATCH routes
router.patch('/details', isAuth, shopController.editShopDetails)
router.patch('/status', isAuth, shopController.editShopStatus)


module.exports = router