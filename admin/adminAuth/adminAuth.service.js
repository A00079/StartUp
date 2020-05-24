const pool = require('../../dbconfig/dbconfig');


module.exports = {
    login : (data, callBack) => {
        let sql = 'SELECT * FROM adminuser where username = ? && userPassword = ?'

        let insertSql = [data.username, data.userPassword]

        pool.query(sql, insertSql, (err, results, fields) => {
            if(err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    }
}
