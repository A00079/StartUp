const router = require('express').Router()
const shopController = require('./shop.controller')
const { isAuth } = require('../middlewares/isAuth')
const { shopValidationRules, validate } = require('../../validator')

// GET routes
router.get('/details', isAuth, shopController.shopProfile)

// POST routes
router.post('/details', isAuth, shopValidationRules(), validate, shopController.shopProfileChange)

// PATCH routes
router.patch('/status', isAuth, shopController.editShopStatus)


module.exports = router