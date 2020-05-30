const router = require('express').Router()
const orderController = require('./order.controller')
const { isAuth } = require('../middlewares/isAuth')

// POST routes
router.post('/createorder',isAuth, orderController.createOrder)

// GET rouets
router.get('/getorders',isAuth, orderController.getAllOrders)


module.exports = router
