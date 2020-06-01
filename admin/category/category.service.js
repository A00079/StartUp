const pool = require('../../dbconfig/dbconfig')

module.exports = {
    add: (categoryName, callBack) => {
        let sql = 'INSERT INTO categories (categoryName) VALUES (?) '
        let insertSql = [categoryName]
        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    get: (callBack) => {
        let sql = 'SELECT categoryName FROM categories'
        pool.query(sql,(err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    delete: (param, callBack) => {
        let sql = 'DELETE FROM categories WHERE category_id = ?'
        let insertSql = [param]
        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    }
}