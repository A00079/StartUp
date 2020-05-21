const pool = require('../../dbconfig/dbconfig')

module.exports = {
    getProfile : (userID, callBack) => {
        var sql = 'SELECT name, shopStatus, phone, shopaddress.shopNo, shopaddress.complex, shopaddress.landmark, shopaddress.street, shopaddress.area, shopaddress.city FROM shop INNER JOIN shopaddress ON shop.id = shopaddress.shop_id WHERE shop.id = ?'

        var insertSql = [userID]

        pool.query(sql, insertSql, (err, results, fields) => {
            if(err) {
               return callBack(err)
            }
            return callBack(null, results)
        })

    }
}