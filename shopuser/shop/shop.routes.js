const router = require('express').Router()
const shopController = require('./shop.controller')
const { isAuth } = require('../middlewares/isAuth')
const { shopValidationRules, validate } = require('../../validator')

// GET routes
router.get('/profile', isAuth, shopController.shopProfile)

// PATCH routes
router.patch('/details', isAuth, shopValidationRules(), validate, shopController.editShopDetails)
router.patch('/status', isAuth, shopController.editShopStatus)


module.exports = router