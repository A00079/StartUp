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

    addPC: (categoryID, productCategoryName, callBack) => {
        let sql = 'INSERT INTO productcategories (category_id, pcName  ) VALUES (?, ?) '
        let insertSql = [categoryID, productCategoryName]
        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    get: (callBack) => {
        let sql = 'SELECT categoryName FROM categories'
        pool.query(sql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    getPC: (callBack) => {
        let sql = 'SELECT pcName FROM productcategories'
        pool.query(sql, (err, results) => {
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
    },
    
    deletePC: (param, callBack) => {
        let sql = 'DELETE FROM productcategories WHERE productcategory_id = ?'
        let insertSql = [param]
        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },
}