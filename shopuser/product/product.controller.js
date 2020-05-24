const productService = require('./product.service')

module.exports = {
    getAllProducts : (req, res) => {
        var userID = req.decoded.id
        productService.getProducts(userID, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                status: 'success',
                data : results
            })
        })
    },

    editProduct: (req, res) => {
        var body = req.body
        var productId = req.params
        var userID = req.decoded.id
        console.log(body)
        productService.edit(body, productId, userID, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                status: 'success',
                message : 'Product updated !',
                data : results
            })
        })
    },

    deleteProduct : (req, res) => {
        var productId = req.params
        var userID = req.decoded.id
        productService.delete(productId, userID, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                status: 'success',
                message : 'Product deleted !',
                data : results
            })
        })
    },

    toggleProductStock: (req, res) => {
        var productId = req.params
        var userID = req.decoded.id
        productService.toggleStock(productId, userID, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                status: 'success',
                message : 'stock toggled !',
                data : results
            })
        })
    },

    toggleProductLowStock: (req, res) => {
        var productId = req.params
        var userID = req.decoded.id
        productService.toggleLowStock(productId, userID, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                status: 'success',
                message : 'Low stock toggled !',
                data : results
            })
        })
    }
}