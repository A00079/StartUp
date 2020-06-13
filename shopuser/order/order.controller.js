const orderService = require('./order.service')
const { Result } = require('express-validator')

module.exports = {
    getAllOrders: (req, res) => {
        var shopID = req.decoded.id
        orderService.getOrders(shopID, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection failed'
                })
            }

            var data = results

            var result = Object.values(data.reduce((acc, { productID, name, price, image, quantity, ...rest }) => {
                acc[rest.orderID] = acc[rest.orderID] || { ...rest, products: [] };
                acc[rest.orderID].products.push({ productID, name, price, image, quantity });
                return acc;
            }, {}));

            return res.status(200).json({
                status: 'success',
                results: result.length,
                orders: result
            })
        })
    },

    cancleOrder: (req, res) => {
        var param = req.params.id
        orderService.cancle(param, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection failed'
                })
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({
                    message: 'order not found'
                })
            }
            return res.status(200).json({
                status: 'success',
                message: 'Order cancelled',
                results: results
            })
        })
    },
    orderDelivered: (req, res) => {
        var param = req.params.id
        orderService.delivered(param, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection failed'
                })
            }
            if (results.affectedRows === 0) {
                return res.status(404).json({
                    message: 'order not found'
                })
            }
            return res.status(200).json({
                status: 'success',
                message: 'Order Delivered',
                results: results
            })
        })
    },
}