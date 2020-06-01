const categoryService = require('./category.service')

module.exports = {
    addProductCategory: (req, res) => {
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

    getProductCategory: async (req, res) => {

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
    }
}