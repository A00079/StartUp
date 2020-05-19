const userController = require('./user.controller');
const router         = require('express').Router();

// POST routes
router.post('/subscribe', userController.createUser);

// GET routes
router.get('/subscribers', userController.getUsers)

module.exports = router;