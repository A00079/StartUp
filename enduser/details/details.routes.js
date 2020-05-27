const detailsController = require('./details.controller');
const router = require('express').Router();
const { isAuth } = require('../middlewares/isAuth')
const { addressValidationRules, phoneNumberValidationRules, validate } = require('../../validator')

// GET routes
router.get('/details', isAuth, detailsController.getDetails)

// POST routes
router.post('/addphone', isAuth, phoneNumberValidationRules(), validate, detailsController.addPhone);
router.post('/addaddress', isAuth, addressValidationRules(), validate, detailsController.addAddress);

// PATCH routes
router.patch('/editaddress', isAuth, addressValidationRules(), validate, detailsController.editAddress);


module.exports = router;
