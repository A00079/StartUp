const userController = require('./user.controller');
const router = require('express').Router();

// POST routes
router.post('/subscribe', userController.createUser);
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

module.exports = router;