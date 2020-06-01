const orderService = require('./order.service')

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

            // var jsonData
            // var finalData
            // var ordersData = []
            // var productsData = []
            // results.forEach(element => {
            //     jsonData =  JSON.stringify(element)
            //     finalData =  JSON.parse(jsonData)
            //      productsData.push({productName :  finalData.name, productPrice : finalData.price})
            //      ordersData.push(productsData)
            // });

            // console.log(ordersData)

            return res.status(200).json({
                status: 'success',
                results: results.length,
                data: {
                    orders: results
                }
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
            if(results.affectedRows === 0) {
                return res.status(404).json({
                    message : 'order not found'
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
        orderService.cancle(param, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection failed'
                })
            }
            if(results.affectedRows === 0) {
                return res.status(404).json({
                    message : 'order not found'
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