const router = require('express').Router()
const categoryController = require('./category.controller')
const { isAuth } = require('../middlewares/isAuth')

// POST routes
router.post('/addcategory',isAuth, categoryController.addCategory)
router.post('/addproductcategory',isAuth, categoryController.addProductCategory)

// GET routes
router.get('/categories',isAuth, categoryController.getCategories)
router.get('/productcategories',isAuth, categoryController.getProductCategories)

// DELETE routes
router.delete('/category/:id',isAuth, categoryController.deleteCategory)
router.delete('/productcategory/:id',isAuth, categoryController.deleteProductCategory)

module.exports = router