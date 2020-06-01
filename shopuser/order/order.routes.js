const router = require('express').Router()
const orderController = require('./order.controller')
const { isAuth } = require('../middlewares/isAuth')

// GET routes
router.get('/orders',isAuth, orderController.getAllOrders)

// PATCH
router.patch('/cancleorder/:id', isAuth, orderController.cancleOrder)
router.patch('/delivered/:id', isAuth, orderController.orderDelivered)

module.exports = router