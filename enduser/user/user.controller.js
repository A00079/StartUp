const userService = require('./user.service');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const pool = require('../../dbconfig/dbconfig')
const config = require('../../config')

module.exports = {
    createUser: (req, res) => {
        var body = req.body;
        userService.create(body, (err, results) => {
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
        });
    },

    registerUser: (req, res) => {
        var email = req.body.email;
        var fullname = req.body.fullname;
        var userPassword = req.body.userPassword
        const saltRounds = 10

        let sql = 'SELECT COUNT(*) AS cnt FROM registeredusers WHERE email = ?'
        pool.query(sql, [req.body.email], (err, results) => {
            if (err) {
                return res.status(500).json({
                    message: 'Internal server error. Retry... '
                })
            }
            else if (results[0].cnt > 0) {
                return res.status(500).json({
                    message: 'Email already exist.',
                })
            }
            bcrypt.hash(userPassword, saltRounds, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Internal error. Retry..'
                    })
                }
                userPassword = hash
                userService.register(fullname, email, userPassword, (err, results) => {
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
                });
            })
        })
    },

    loginUser: (req, res) => {
        var email = req.body.email
        var userPassword = req.body.userPassword

        if (!email || !userPassword) {
            return res.status(400).json({
                message: 'Please provide email and password'
            })
        }
        userService.login(email, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'DataBase Connection Error'
                });
            }
            else if (!results) {
                return res.status(400).json({
                    message: 'incorrect credentials'
                })
            }
            bcrypt.compare(userPassword, results[0].userPassword, (err, isMatch) => {
                if (err) {
                    return res.status(500).json({
                        message: 'Internal server error. Retry...'
                    })
                } else if (!isMatch) {
                    return res.status(400).json({
                        message: 'incorrect credentials',
                    });
                }
                else if (isMatch) {
                    var token = jwt.sign({ id: results[0].id }, config.usersecret, {
                        expiresIn: "24h"
                    })
                    res.status(200).json({
                        status: 'success',
                        message: 'login success',
                        token: token
                    });
                }
            })
        })
    },

    addPhone: (req, res) => {
        const body = req.body
        var userID = req.decoded.id
        userService.phone(body, userID, (err, results) => {
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
        userService.address(body, userID, (err, results) => {
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
