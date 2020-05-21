const pool = require('../../dbconfig/dbconfig');

module.exports = {
    add: (data, callBack) => {
        let sql = 'INSERT INTO products (name , price, description , stock, image, shop_id) VALUES (?,?,?,?,?,?)';
        pool.query(sql, [data.name, data.price, data.description, data.stock, data.image, data.shop_id], (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    get: (callBack) => {
        let sql = 'SELECT name, shopStatus, phone, shopaddress.shopNo, shopaddress.complex, shopaddress.landmark, shopaddress.street, shopaddress.area, shopaddress.city FROM shop INNER JOIN shopaddress ON shop.id = shopaddress.shop_id'
        pool.query(sql, (err, results, fields) => {
            if(err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    getSingle : (param, callBack) => {
        let sql = 'SELECT * FROM products WHERE id = ?'
        pool.query(sql, param.id, (err, results, fields) => {
            if(err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    edit : (data, param, callBack) => {
        let sql = 'UPDATE products SET name = ?, price = ?, description = ?, stock = ?, image = ? WHERE id = ?'
        pool.query(sql, [data.name, data.price, data.description, data.stock, data.image,param.id], (err, results, fields) => {
            if(err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    delete : (param, callBack) => {
        let sql = 'DELETE FROM products WHERE id = ?'
        pool.query(sql, param.id, (err, results, fields) => {
            if(err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },
}



