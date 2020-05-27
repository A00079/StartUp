const detailsService = require('./details.service');

module.exports = {

    getDetails: (req, res) => {
        var userID = req.decoded.id
        detailsService.details(userID, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'DataBase Connection Error'
                });
            }
            return res.status(200).json({
                status: 'success',
                data: results
            });
        })
    },

    addPhone: (req, res) => {
        const body = req.body
        var userID = req.decoded.id
        detailsService.phone(body, userID, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'DataBase Connection Error'
                });
            }
            return res.status(200).json({
                status: 'success',
                data: results
            });
        })
    },

    addAddress: (req, res) => {
        const body = req.body
        var userID = req.decoded.id
        detailsService.address(body, userID, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'DataBase Connection Error'
                });
            }
            return res.status(200).json({
                status: 'success',
                data: results
            });
        })
    },

    editAddress: (req, res) => {
        const body = req.body
        var userID = req.decoded.id
        detailsService.edit(body, userID, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'DataBase Connection Error'
                });
            }
            return res.status(200).json({
                status: 'success',
                data: results
            });
        })
    },
}
