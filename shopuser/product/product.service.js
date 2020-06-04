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

    edit: (data, param, userID, callBack) => {
        var sql = 'UPDATE products SET price = ?, unit = ? WHERE id = ? and shop_id = ?'

        var insertSql = [data.price, data.unit, param.id, userID]

        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    delete: (param, userID, callBack) => {
        var sql = 'DELETE FROM products WHERE id = ? and shop_id = ?'

        var insertSql = [param.id, userID]

        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    toggleStock: (param, userID, callBack) => {
        var sql = 'UPDATE products SET stock = !stock WHERE id = ? and shop_id = ?'

        var insertSql = [param.id, userID]

        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    toggleLowStock: (param, userID, callBack) => {
        var sql = 'UPDATE products SET lowStock = !lowStock WHERE id = ? and shop_id = ?'

        var insertSql = [param.id, userID]

        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    }
}