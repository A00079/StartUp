const pool = require('../../dbconfig/dbconfig')

module.exports = {
    getProfile: (userID, callBack) => {
        var sql = 'SELECT name,  shopStatus, phone, shopaddress.shopNo, shopaddress.complex, shopaddress.landmark, shopaddress.street, shopaddress.area, shopaddress.city FROM shop INNER JOIN shopaddress ON shop.id = shopaddress.shop_id WHERE shop.id = ?'

        var insertSql = [userID]

        pool.query(sql, insertSql, (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })

    },

    profileChange: (data, userID, callBack) => {
        var sql = 'INSERT INTO shopprofilechange (shop_id, name, phone, shopNo, complex, landmark, street, area, city) VALUES (?,?,?,?,?,?,?,?,?)'

        var insertSql = [userID, data.name, data.phone, data.shopNo, data.complex, data.landmark, data.street, data.area, data.city, ]

        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    toggleStatus: (userID, callBack) => {
        pool.getConnection((err, connection) => {
            connection.beginTransaction(err => {
                if (err) {
                    throw err
                }

                var sql = 'UPDATE shop SET shopStatus = !shopStatus WHERE shop.id = ?'
                var insertSql = [userID]
                connection.query(sql, insertSql, (err, results) => {
                    if (err) {
                        return connection.rollback(_ => {
                            throw err
                        })
                    }
                    var sqlStatus = 'SELECT shopStatus FROM shop WHERE shop.id = ?'
                    var insertSqlStatus = [userID]
                    connection.query(sqlStatus, insertSqlStatus, (err, results) => {
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