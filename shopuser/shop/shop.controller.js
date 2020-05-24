const shopService = require('./shop.service')

module.exports = {
    shopProfile: (req, res) => {
        var userID = req.decoded.id
        shopService.getProfile(userID, (err, results) => {
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

    editShopDetails: (req, res) => {
        var body = req.body
        var userID = req.decoded.id
        shopService.editDetails(body, userID, (err, results) => {
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

    editShopStatus: (req, res) => {
        var userID = req.decoded.id
        shopService.toggleStatus(userID, (err, results) => {
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
    }
    
}