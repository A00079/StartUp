const router = require('express').Router()
const shopAuthController = require('./shopAuth.controller')

// POST routes
router.post('/login', shopAuthController.login)

module.exports = router