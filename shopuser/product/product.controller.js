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
                results : results.length,
                data : results
            })
        })
    },

    getInActiveProducts : (req, res) => {
        var userID = req.decoded.id
        productService.inActiveProducts(userID, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                status: 'success',
                results : results.length,
                data : results
            })
        })
    },

    addProduct : (req, res) => {
        var body = req.body
        var userID = req.decoded.id
        productService.product(body,userID, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                status: 'success',
                message : "Product added"
            })
        })
    },

    getSingleProduct : (req, res) => {
        var productId = req.params
        var userID = req.decoded.id
        productService.getSingleProduct(productId, userID, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                status: 'success',
                product : results
            })
        })
    },

    editProduct: (req, res) => {
        var body = req.body
        var productId = req.params
        var userID = req.decoded.id
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
                message : 'Product updated !'
            })
        })
    },

    editProductsPrice: (req, res) => {
        var body = req.body
        var productId = req.params
        productService.editP(body, productId, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                status: 'success',
                message : 'Product updated !'
            })
        })
    },

    inActivateProduct : (req, res) => {
        var productId = req.params
        var userID = req.decoded.id
        productService.inActive(productId, userID, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                status: 'success',
                message : 'Product Inactivated !',
                data : results
            })
        })
    },

    activateProduct : (req, res) => {
        var productId = req.params
        var userID = req.decoded.id
        productService.activate(productId, userID, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                status: 'success',
                message : 'Product Inactivated !',
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

    toggleProductSStock: (req, res) => {
        var productId = req.params
        productService.toggleSStock(productId,(err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                status: 'success',
                message : 'Small product stock toggled.',
                data : results
            })
        })
    },

    toggleProductMStock: (req, res) => {
        var productId = req.params
        productService.toggleMStock(productId,(err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                status: 'success',
                message : 'Medium product stock toggled.',
                data : results
            })
        })
    },

    toggleProductLStock: (req, res) => {
        var productId = req.params
        productService.toggleLStock(productId,(err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                status: 'success',
                message : 'Large product stock toggled.',
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