const productService = require('./product.service');
const fs = require('fs')
const path = require('path')


const clearImage = filePath => {
    filePath = path.join(__dirname, +'../../'+ filePath)
    fs.unlink(filePath, err => console.log(err))
}

module.exports = {

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
            if (results < 1 ) {
                return res.status(404).json({
                    message : 'Product ID not found'
                })
            }
            return res.status(200).json({
                status: 'success',
                data: results
            })
        })
    },

    editProduct: (req, res) => {
        if(!req.file){
            res.status(422).json({
                message : 'image not found'
            })
        }
        var imageUrl = req.file.path
        var body = req.body
        var productId = req.params
        productService.edit(body, productId,imageUrl, (err, results, fields) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection error'
                })
            }
            console.log(fields)
            if(results.affectedRows === 0){
                return res.status(404).json({
                    message : "Product ID not found"
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
            if(results.affectedRows === 0){
                return res.status(404).json({
                    message : "Product ID not found"
                })    
            }
            return res.status(200).json({
                status: 'success',
                data: results
            })
        })
    },
}
