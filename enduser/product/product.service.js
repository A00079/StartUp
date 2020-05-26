const pool = require('../../dbconfig/dbconfig')

module.exports = {
    getAllProducts: (callBack) => {
        const sql = 'SELECT * FROM products'
        pool.query(sql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    getSingleProduct: (param, callBack) => {
        const sql = 'SELECT * FROM products WHERE id = ?'
        const insertSql = [param.id]
        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

}