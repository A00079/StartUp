const userController = require('./user.controller');
const router = require('express').Router();
const { enduserLoginValidationRules, enduserRegisterValidationRules, validate } = require('../../validator')


// POST routes
router.post('/subscribe', userController.createUser);
router.post('/register', enduserRegisterValidationRules(), validate, userController.registerUser);
router.post('/login', enduserLoginValidationRules(), validate, userController.loginUser);


module.exports = router;