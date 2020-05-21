const jwt = require('jsonwebtoken')
const config = require('../../config')
const adminAuthService = require('./adminAuth.service')


module.exports = {
    login: (req, res) => {
        var body = req.body
        adminAuthService.login(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection error'
                })
            }
            else if (results.length !== 1) {
                return res.status(401).json({
                    message: 'USERNAME OR PASSWORD INCORRECT'
                })
            }
            else if (results.length === 1) {
                // Correct user credentials
                var token = jwt.sign({ result: results.username }, config.secret, {
                    expiresIn: '1h'
                })
            }
            res.status(200).json({
                status: 'success',
                token: token,
            })
        })
    }
}