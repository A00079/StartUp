const router = require('express').Router()
const adminAuthController = require('./adminAuth.controller')
const { adminuserValidationRules, validate } = require('../../validator')

router.post('/login',adminuserValidationRules(), validate, adminAuthController.login)

module.exports = router