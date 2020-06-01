const orderService = require('./order.service')

module.exports = {
    createOrder: (req, res) => {

        var products = req.body.products
        var mainData = {
            purAmt: req.body.purAmt,
            products: [
                {
                    productId: req.body.productId,
                    quantity: req.body.quantity
                }
            ]
        }

        var userID = req.decoded.id

        orderService.create(userID, mainData, products, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                status: 'Success',
                message: 'Order created'
            })
        })
    },

    getAllOrders: (req, res) => {
        let userID = req.decoded.id
        orderService.getOrders(userID, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection error'
                })
            }

            return res.status(200).json({
                status: 'Success',
                results: results.length,
                data:
                {
                    orders: results
                }
            })
        })
    }
}