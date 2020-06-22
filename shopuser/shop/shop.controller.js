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

    shopProfileChange: (req, res) => {
        var body = req.body
        var userID = req.decoded.id
        shopService.profileChange(body, userID, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection error'
                })
            }
            return res.status(200).json({
                status: 'success',
                message : 'Update profile request sent'
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
                message : 'Shop status updated',
                data : results 
            })
        })
    }
    
}