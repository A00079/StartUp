const productService = require('./product.service')

module.exports = {
    getProducts :(req, res) => {
        productService.getAllProducts((err, results) => {
            if(err) {
                return res.status(500).json({
                    status : 'error',
                    error : err,
                    message: 'Database connection error.'
                })
            }
            return res.status(200).json({
                status: 'success',
                results : results.length,
                data : results
            })
        })
    },

    getProduct :(req, res) => {
        const productId = req.params
        productService.getSingleProduct(productId, (err, results) => {
            if(err) {
                return res.status(500).json({
                    status : 'error',
                    error : err,
                    message: 'Database connection error.'
                })
            }
            return res.status(200).json({
                status: 'success',
                data : results
            })
        })
    },
}