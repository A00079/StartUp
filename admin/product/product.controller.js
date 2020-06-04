const productService = require('./product.service');
const fs = require('fs')
const path = require('path')
const pool = require('../../dbconfig/dbconfig')

const clearImage = filePath => {
    filePath = path.join(__dirname, '..', '..', filePath)
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
            if (results < 1) {
                return res.status(404).json({
                    message: 'Product ID not found'
                })
            }
            return res.status(200).json({
                status: 'success',
                data: results
            })
        })
    },

    editProduct: (req, res) => {
        if (!req.file) {
            res.status(422).json({
                message: 'image not found'
            })
        }
        var imageUrl = req.file.path
        var body = req.body
        var productId = req.params
        productService.edit(body, productId, imageUrl, (err, results, fields) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection error'
                })
            }
            // get images name from database to compare and update with current image
            let main
            pool.query('SELECT image FROM products WHERE id = ?', productId, (err, qryRes) => {
                if (err) {
                    return console.log(err)
                }
                const str = JSON.stringify(qryRes)
                main = JSON.parse(str)
                for (var i in main) {
                    if (main[i] !== imageUrl) {
                        clearImage(imageUrl)
                    }
                }
            })

            if (results.affectedRows === 0) {
                return res.status(404).json({
                    message: "Product ID not found"
                })
            }
            return res.status(200).json({
                status: 'success',
                data: results
            })
        })

    },

    inactiveProduct: (req, res) => {

        var productId = req.params
        productService.inactive(productId, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection error'
                })
            }

            // pool.query('SELECT image FROM products WHERE product id = ?', productId, (err, results) => {
            //     if (err) {
            //         return console.log(err)
            //     }
            //     const str = JSON.stringify(results)
            //     var main = JSON.parse(str)
            //     console.log(main)
            //     clearImage(main)
            // })

            if (results.affectedRows === 0) {
                return res.status(404).json({
                    message: "Product ID not found"
                })
            }
            return res.status(200).json({
                status: 'success',
                message : 'product inactivated'
            })
        })
    },
}
