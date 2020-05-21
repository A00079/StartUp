const productService = require('./product.service');

module.exports = {
    addProduct: (req, res) => {
        var body = req.body
        productService.add(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                status: 'success',
                data: results
            })
        })
    },

    getProducts: (req, res) => {
        productService.get((err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                status: 'success',
                results: results.length,
                data: results
            })
        })
    },

    getProduct: (req, res) => {
        var productId = req.params
        productService.getSingle(productId, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                status: 'success',
                data: results
            })
        })
    },

    editProduct: (req, res) => {
        var body = req.body
        var productId = req.params
        productService.edit(body, productId, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                status: 'success',
                data: results
            })
        })
    },

    deleteProduct: (req, res) => {
        var productId = req.params
        productService.delete(productId, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                status: 'success',
                data: results
            })
        })
    },
}


