const pool = require('../../dbconfig/dbconfig')

module.exports = {
    login : (data, callBack) => {
        let sql = 'SELECT * FROM shop where shopId = ? && shopPassword = ?'
        
        let insertSql = [data.shopId, data.shopPassword]

        pool.query(sql, insertSql, (err, results, fields) => {
            if(err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    }
}