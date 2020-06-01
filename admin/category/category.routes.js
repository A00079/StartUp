const router = require('express').Router()
const categoryController = require('./category.controller')
const { isAuth } = require('../middlewares/isAuth')


// POST routes
router.post('/addcategory',isAuth, categoryController.addProductCategory)

// GET routes
router.get('/categories',isAuth, categoryController.getProductCategory)

// DELETE routes
router.delete('/category/:id',isAuth, categoryController.deleteCategory)



module.exports = router