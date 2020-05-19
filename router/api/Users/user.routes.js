const { createUser, verifyUserLogin } = require('../../api/Users/user.controller');

const router         = require('express').Router();

router.post('/subscribe', createUser);
router.post('/login', verifyUserLogin);

module.exports = router;