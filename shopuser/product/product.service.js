const pool = require('../../dbconfig/dbconfig')

module.exports = {

    getProducts: (userID, callBack) => {
        var sql = 'SELECT * FROM products WHERE isActive = 1 AND shop_id = ?'

        var insertSql = [userID]

        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    units: (callBack) => {
        var sql = 'SELECT * FROM units'

        pool.query(sql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    inActiveProducts: (userID, callBack) => {
        var sql = 'SELECT * FROM products WHERE isActive = 0 AND shop_id = ?'

        var insertSql = [userID]

        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    product: (data, userID, callBack) => {
        var sql = 'INSERT INTO productsbyshop (shop_id, productName, productPrice, unit_id) VALUES (?,?,?,?)'

        var insertSql = [userID, data.productName, data.productPrice, data.unitID]

        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    getSingleProduct: (param, userID, callBack) => {
        var sql = 'SELECT products.*, productsizes.sprice, productsizes.mprice, productsizes.lprice FROM products LEFT JOIN productsizes ON productsizes.product_id = products.id WHERE isActive = 1 AND products.id = ? AND shop_id = ?'

        var insertSql = [param.id, userID]

        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    edit: (data, param, userID, callBack) => {
        pool.getConnection((err, connection) => {
            connection.beginTransaction(err => {
                if (err) {
                    throw err
                }
                var sql = 'UPDATE products SET price = ? WHERE id = ? and shop_id = ?'
                var insertSql = [data.price, param.id, userID]
                connection.query(sql, insertSql, (err, results) => {
                    if (err) {
                        return connection.rollback(_ => {
                            throw err
                        })
                    }
                    var sqlGet = 'SELECT products.*, productsizes.sprice, productsizes.mprice, productsizes.lprice FROM products LEFT JOIN productsizes ON productsizes.product_id = products.id WHERE isActive = 1 AND products.id = ? AND shop_id = ?'
                    var insertSqlGet = [param.id, userID]
                    connection.query(sqlGet, insertSqlGet, (err, results) => {
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

    editP: (data, param, callBack) => {
        pool.getConnection((err, connection) => {
            connection.beginTransaction(err => {
                if (err) {
                    throw err
                }
                var sql = 'UPDATE productsizes SET sprice = ?, mprice = ?, lprice = ? WHERE product_id = ?'

                var insertSql = [data.sprice, data.mprice, data.lprice, param.id]

                connection.query(sql, insertSql, (err, results) => {
                    if (err) {
                        return connection.rollback(_ => {
                            throw err
                        })
                    }
                    var sqlGet = 'SELECT products.*, productsizes.sprice, productsizes.mprice, productsizes.lprice FROM products LEFT JOIN productsizes ON productsizes.product_id = products.id WHERE isActive = 1 AND products.id = ?'
                    var insertSqlGet = [param.id]
                    connection.query(sqlGet, insertSqlGet, (err, results) => {
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

    inActive: (param, userID, callBack) => {
        var sql = 'UPDATE PRODUCTS SET isActive = 0 WHERE id = ? and shop_id = ?'

        var insertSql = [param.id, userID]

        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    activate: (param, userID, callBack) => {
        var sql = 'UPDATE PRODUCTS SET isActive = 1 WHERE id = ? and shop_id = ?'

        var insertSql = [param.id, userID]

        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    toggleStock: (param, userID, callBack) => {
        pool.getConnection((err, connection) => {
            connection.beginTransaction(err => {
                if (err) {
                    throw err
                }
                var sql = 'UPDATE products SET stock = !stock WHERE id = ? and shop_id = ?'

                var insertSql = [param.id, userID]

                connection.query(sql, insertSql, (err, results) => {
                    if (err) {
                        return connection.rollback(_ => {
                            throw err
                        })
                    }
                    var sqlGet = 'SELECT stock FROM products WHERE id = ? AND shop_id = ?'
                    var insertSqlGet = [param.id, userID]
                    connection.query(sqlGet, insertSqlGet, (err, results) => {
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

    toggleSStock: (param, callBack) => {
        var sql = 'UPDATE productsizes SET sstock = !sstock WHERE product_id = ?'

        var insertSql = [param.id]

        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    toggleMStock: (param, callBack) => {
        var sql = 'UPDATE productsizes SET mstock = !mstock WHERE product_id = ?'

        var insertSql = [param.id]

        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    toggleLStock: (param, callBack) => {
        var sql = 'UPDATE productsizes SET lstock = !lstock WHERE product_id = ?'

        var insertSql = [param.id]

        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    toggleLowStock: (param, userID, callBack) => {
        pool.getConnection((err, connection) => {
            connection.beginTransaction(err => {
                if (err) {
                    throw err
                }
                var sql = 'UPDATE products SET lowStock = !lowStock WHERE id = ? and shop_id = ?'

                var insertSql = [param.id, userID]

                connection.query(sql, insertSql, (err, results) => {
                    if (err) {
                        return connection.rollback(_ => {
                            throw err
                        })
                    }
                    var sqlGet = 'SELECT lowStock FROM products WHERE id = ? AND shop_id = ?'

                    var insertSqlGet = [param.id, userID]

                    connection.query(sqlGet, insertSqlGet, (err, results) => {
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
    }
}