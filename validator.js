const { body, validationResult } = require('express-validator')

const productValidationRules = () => {
  return [
    // username must be an email
    body('name', 'Name should be more than 1 characters long.').isLength({ min: 2 }),
    // password must be at least 5 chars long
    body('price', 'Price should be numeric').not().isEmpty().trim().isNumeric(),
    body('unit', 'Unit should not be empty').not().isEmpty(),
  ]
}

const shopValidationRules = () => {
  return [
    // username must be an email
    body('name', 'Shop name should be more than 2 characters.').isLength({ min: 3 }),
    // password must be at least 5 chars long
    body('phone', 'Invalid Phone number.').isNumeric().isLength({ min: 10, max: 13 }),
    body('shopNo', 'Shop number cannot be empty.').not().isEmpty(),
    body('complex', 'Complex name should not be empty', 'max 15 characters allowed.').not().isEmpty().isLength({ max: 15 }),
    body('landmark', 'max 15 characters allowed.').isLength({ max: 15 }),
    body('street', 'Street name should not be empty').not().isEmpty().isLength({ max: 15 }).withMessage('max 15 characters allowed.'),
    body('area', 'Area name should not be empty').not().isEmpty().isLength({ max: 15 }).withMessage('max 15 characters allowed.'),
    body('city', 'City name should not be empty').not().isEmpty().isLength({ max: 15 }).withMessage('max 15 characters allowed.'),
  ]
}

const adminuserValidationRules = () => {
  return [
    body('username', 'Username should not be empty.').not().isEmpty().trim(),
    body('userPassword', 'Password should not be empty.').not().isEmpty().trim(),
  ]
}

const shopuserValidationRules = () => {
  return [
    body('username', 'Username should not be empty.').not().isEmpty().trim(),
    body('userPassword', 'Password should not be empty.').not().isEmpty().trim(),
  ]
}

const enduserRegisterValidationRules = () => {
  return [
    body('fullname', 'Name should not be empty.').not().isEmpty().trim().isLength({ min: 2, max: 15 }).withMessage('Name should be between 2 - 15 characters.'),
    body('email', 'Invalid email.').not().isEmpty().trim().isEmail(),
    body('userPassword', 'Password should not be empty.').not().isEmpty().trim().isLength({ min: 4, max: 30 }).withMessage('Password should be between 4 - 30 characters.'),
  ]
}

const enduserLoginValidationRules = () => {
  return [
    body('email', 'Invalid email.').not().isEmpty().trim().isEmail(),
    body('userPassword', 'Password should not be empty.').not().isEmpty().trim(),
  ]
}

const phoneNumberValidationRules = () => {
  return [
    body('phone', 'Invalid Phone number').isLength({min:10}),
  ]
}

const addressValidationRules = () => {
  return [
    body('flatNo', 'Flat No. number cannot be empty.').not().isEmpty(),
    body('complex', 'Complex name should not be empty', 'max 15 characters allowed.').not().isEmpty().isLength({ max: 15 }),
    body('landmark', 'max 15 characters allowed.').isLength({ max: 15 }),
    body('street', 'Street name should not be empty').not().isEmpty().isLength({ max: 15 }).withMessage('max 15 characters allowed.'),
    body('area', 'Area name should not be empty').not().isEmpty().isLength({ max: 15 }).withMessage('max 15 characters allowed.'),
    body('city', 'City name should not be empty').not().isEmpty().isLength({ max: 15 }).withMessage('max 15 characters allowed.'),
  ]
}

// Validate function
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
  shopuserValidationRules,
  enduserRegisterValidationRules,
  enduserLoginValidationRules,
  phoneNumberValidationRules,
  addressValidationRules,
  validate,
}