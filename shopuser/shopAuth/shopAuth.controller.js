const jwt = require('jsonwebtoken')
const config = require('../../config')
const shopAuthService = require('./shopAuth.service')

module.exports = {
    login: (req, res) => {
        var body = req.body

        shopAuthService.login(body, (err, results) => {
            var tokenData = results.map(z => z.id)
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
                var token = jwt.sign({ id : tokenData[0] }, config.shopsecret, {
                    expiresIn: "24h"
                })
            }
            res.status(200).json({
                status: 'success',
                token: token
            })
        })
    }
}