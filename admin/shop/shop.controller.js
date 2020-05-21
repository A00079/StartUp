const shopService = require('./shop.service');
const isAuth = require('../middlewares/isAuth')
const config = require('../../config')
const jwt = require('jsonwebtoken')


module.exports = {
    addShop: (req, res) => {
        var body = req.body
        shopService.add(body, (err, results) => {
            if (err) {
                res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection failed'
                })
            }
            return res.status(200).json({
                status: 'success',
                data: results
            })
        })
    },

    addShopProduct: (req, res) => {
        var body = req.body
        var shopId = req.params
        shopService.addProduct(body, shopId, (err, results) => {
            if (err) {
                res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection failed'
                })
            }
            return res.status(200).json({
                status: 'success',
                data: results
            })
        })
    },

    getShops: (req, res) => {
        shopService.get((err, results) => {
            if (err) {
                res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection failed'
                })
            }
            return res.status(200).json({
                status: 'success',
                results: results.length,
                data: results
            })
        })
    },

    getShop: (req, res) => {
        var shopId = req.params
        shopService.getSingle(shopId, (err, results) => {
            if (err) {
                res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection failed'
                })
            }
            return res.status(200).json({
                status: 'success',
                data: results
            })
        })
    },

    editShop: (req, res) => {
        var body = req.body
        var shopId = req.params
        shopService.edit(body, shopId, (err, results) => {
            if (err) {
                res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection failed'
                })
            }
            return res.status(200).json({
                status: 'success',
                data: results
            })
        })
    },

    deleteShop: (req, res) => {
        var shopId = req.params
        shopService.delete(shopId, (err, results) => {
            if (err) {
                res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'Database connection failed'
                })
            }
            return res.status(200).json({
                status: 'success',
                data: results
            })
        })
    }
}