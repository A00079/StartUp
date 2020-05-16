const { createUser } = require('../../api/Users/user.controller');
const router         = require('express').Router();

router.post('/subscribe', createUser);

module.exports = router;