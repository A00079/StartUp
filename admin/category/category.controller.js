const categoryService = require('./category.service')

module.exports = {
    addCategory: (req, res) => {
        var categoryName = req.body.categoryName
        categoryService.add(categoryName, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection failed'
                })
            }
            return res.status(201).json({
                status: 'success',
                message: 'Category added'
            })
        })
    },

    addProductCategory: (req, res) => {
        var categoryID = req.body.categoryID
        var productCategoryName = req.body.productCategoryName
        categoryService.addPC(categoryID,productCategoryName, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection failed'
                })
            }
            return res.status(201).json({
                status: 'success',
                message: 'Product category added'
            })
        })
    },

    getCategories: async (req, res) => {

        categoryService.get((err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection failed'
                })
            }
            return res.status(201).json({
                status: 'success',
                results: results.length,
                data: {
                    categories: results
                }
            })
        })
    },

    getProductCategories: async (req, res) => {

        categoryService.getPC((err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection failed'
                })
            }
            return res.status(201).json({
                status: 'success',
                results: results.length,
                data: {
                    productCategories: results
                }
            })
        })
    },

    deleteCategory: (req, res) => {
        var categoryID = req.params.id
        categoryService.delete(categoryID, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection failed'
                })
            }
            if (results.affectedRows === 0) {
                res.status(404).json({
                    status: 'error',
                    message: 'Category ID not found'
                })
            }
            return res.status(201).json({
                status: 'success',
                message: 'Category deleted'
            })
        })
    },

    deleteProductCategory: (req, res) => {
        var categoryID = req.params.id
        categoryService.deletePC(categoryID, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection failed'
                })
            }
            if (results.affectedRows === 0) {
                res.status(404).json({
                    status: 'error',
                    message: 'Category ID not found'
                })
            }
            return res.status(201).json({
                status: 'success',
                message: 'Product category deleted'
            })
        })
    },
}