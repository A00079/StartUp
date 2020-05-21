const router = require('express').Router()
const shopController = require('./shop.controller')
const { isAuth } = require('../middlewares/isAuth')

// GET routes
router.get('/shopprofile', isAuth, shopController.shopProfile)

// PATCH routes

module.exports = router