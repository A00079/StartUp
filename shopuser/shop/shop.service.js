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

    editDetails: (data, userID, callBack) => {
        var sql = 'UPDATE shopaddress,shop SET shop.name = ?, shop.phone = ?, shopaddress.shopNo = ?, shopaddress.complex = ?, shopaddress.landmark = ?, shopaddress.street = ?, shopaddress.area = ?, shopaddress.city = ? WHERE shop.id = shopaddress.shop_id AND shop.id = ?'

        var insertSql = [data.name, data.phone, data.shopNo, data.complex, data.landmark, data.street, data.area, data.city, userID]

        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    toggleStatus: (userID, callBack) => {
        var sql = 'UPDATE shop SET shopStatus = !shopStatus WHERE shop.id = ?'

        var insertSql = [userID]

        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    }


}