const pool = require('../../dbconfig/dbconfig');

module.exports = {
    add: (data, callBack) => {
        let sql = 'INSERT INTO products (name , price, description , stock, image) VALUES (?,?,?,?,?)';
        pool.query(sql, [data.name, data.price, data.description, data.stock, data.image], (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    get: (callBack) => {
        let sql = 'SELECT * FROM products'
        pool.query(sql, (err, results, fields) => {
            if(err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    getSingle : (param, callback) => {
        let sql = 'SELECT * FROM products WHERE id = ?'
        pool.query(sql, param.id, (err, results, fields) => {
            if(err) {
                return callback(err)
            }
            return callback(null, results)
        })
    },

    edit : (data, param, callback) => {
        let sql = 'UPDATE products SET name = ?, price = ?, description = ?, stock = ?, image = ? WHERE id = ?'
        pool.query(sql, [data.name, data.price, data.description, data.stock, data.image,param.id], (err, results, fields) => {
            if(err) {
                return callback(err)
            }
            return callback(null, results)
        })
    },

    delete : (param, callback) => {
        let sql = 'DELETE FROM products WHERE id = ?'
        pool.query(sql, param.id, (err, results, fields) => {
            if(err) {
                return callback(err)
            }
            return callback(null, results)
        })
    },
}



