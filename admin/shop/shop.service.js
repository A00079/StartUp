const pool = require('../../dbconfig/dbconfig');
const shortid = require('shortid');

module.exports = {
    add: (data, callBack) => {
        // Begin Transaction  
        pool.getConnection((err, connection) => {
            connection.beginTransaction(err => {
                if (err) {
                    throw err
                }
                var shopQuery = 'INSERT INTO shop (name, shopId, shopPassword, shopStatus, phone) VALUES (?,?,?,?,?)';

                var insertShopQuery = [data.name, shortid.generate(), shortid.generate(), data.shopStatus, data.phone]

                connection.query(shopQuery, insertShopQuery, (err, results) => {
                    if (err) {
                        return connection.rollback(_ => {
                            throw err
                        })
                    }
                    console.log(results.insertId)
                    let lastId = results.insertId

                    var shopaddressQuery = 'INSERT INTO shopaddress (shopNo, complex, landmark, street, area, city, shop_id) VALUES (?,?,?,?,?,?,?)';

                    var insertShopAddressQuery = [data.shopNo, data.complex, data.landmark, data.street, data.area, data.city, lastId]

                    connection.query(shopaddressQuery, insertShopAddressQuery, (err, results) => {
                        if (err) {
                            return connection.rollback(_ => {
                                throw err
                            })
                        }
                        connection.commit(err => {
                            if (err) {
                                connection.rollback(_ => {
                                    throw err
                                })
                            }
                            connection.release()
                            callBack(null, results)
                        })
                    })
                })
            })
        })
    },

    addProduct: (data, param, imageUrl, callBack) => {

        let sql = 'INSERT INTO products (name, price, description, stock, image,unit, shop_id) VALUES (?,?,?,?,?,?,?)';

        pool.query(sql, [data.name, data.price, data.description, data.stock, imageUrl, data.unit, param.id], (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    get: (callBack) => {
        let sql = 'SELECT  shop.id, shop.name, shop.shopId, shop.shopPassword, shop.shopStatus, shop.phone, shopaddress.shopNo, shopaddress.complex, shopaddress.landmark, shopaddress.street, shopaddress.area, shopaddress.city FROM shop INNER JOIN shopaddress on shop.id = shopaddress.shop_id;'
        pool.query(sql, (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    getSingle: (param, callBack) => {
        let sql = 'SELECT  shop.id, shop.name, shop.shopId, shop.shopPassword, shop.shopStatus, shop.phone, shopaddress.shopNo, shopaddress.complex, shopaddress.landmark, shopaddress.street, shopaddress.area, shopaddress.city FROM shop INNER JOIN shopaddress on shop.id = shopaddress.shop_id WHERE shop.id = ?';
        pool.query(sql, param.id, (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    getProducts: (param, callBack) => {
        var sql = 'SELECT * FROM products WHERE shop_id = ?'

        var insertSql = [param.id]

        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },


    edit: (data, param, callBack) => {
        let sql = 'UPDATE shop SET name = ?, shopStatus = ?, phone = ? WHERE id = ?'
        pool.query(sql, [data.name, data.shopStatus, data.phone, param.id], (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    editStatus: (param, callBack) => {
        let sql = 'UPDATE shop SET shopStatus = !shopStatus WHERE id = ?'
        pool.query(sql, [param.id], (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },


    editProduct: (data, param, param2, callBack) => {
        var sql = 'UPDATE products SET name = ?, price = ?, description = ?, image = ?, unit = ? WHERE id = ? and shop_id = ?'

        var insertSql = [data.name, data.price, data.description, data.image, data.unit, param2.id, param.id]

        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    delete: (param, callBack) => {
        let sql = 'DELETE FROM shop WHERE id = ? '
        pool.query(sql, param.id, (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    deleteProduct: (param, param2, callBack) => {
        var sql = 'DELETE FROM products WHERE id = ? and shop_id = ?'

        var insertSql = [param.id, param2.id]

        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    }
}