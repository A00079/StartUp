const { body, validationResult } = require('express-validator')

const productValidationRules = () => {
  return [
    // username must be an email
    body('name', 'Name should be more than 1 characters long.').isLength({min:2}),
    // password must be at least 5 chars long
    body('price', 'Price should be numeric').not().isEmpty().trim().isNumeric(),
    body('unit', 'Unit should not be empty').not().isEmpty(),
  ]
}

const shopValidationRules = () => {
    return [
      // username must be an email
      body('name', 'Shop name should be more than 2 characters.').isLength({min:3}),
      // password must be at least 5 chars long
      body('phone', 'Invalid Phone number.').isNumeric().isLength({min:10, max:13}),
      body('shopNo', 'Shop number cannot be empty.').not().isEmpty(),
      body('complex', 'Complex name should not be empty','max 15 characters allowed.').not().isEmpty().isLength({max:15}),
      body('landmark','max 15 characters allowed.').isLength({max:15}),
      body('street', 'Street name should not be empty').not().isEmpty().isLength({max:15}).withMessage('max 15 characters allowed.'),
      body('area', 'Area name should not be empty').not().isEmpty().isLength({max:15}).withMessage('max 15 characters allowed.'),
      body('city', 'City name should not be empty').not().isEmpty().isLength({max:15}).withMessage('max 15 characters allowed.'),
    ]
  }
  
const adminuserValidationRules = () => {
  return [
    // username must be an email
    body('username', 'Username should be empty.').not().isEmpty().trim(),
    // password must be at least 5 chars long
    body('userPassword', 'Password should not be empty.').not().isEmpty().trim(),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  productValidationRules,
  shopValidationRules,
  adminuserValidationRules,
  validate,
}