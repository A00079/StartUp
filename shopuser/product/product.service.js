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
        var sql = 'UPDATE products SET price = ? WHERE id = ? and shop_id = ?'

        var insertSql = [data.price, param.id, userID]

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