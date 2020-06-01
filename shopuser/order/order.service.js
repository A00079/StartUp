const pool = require('../../dbconfig/dbconfig')

module.exports = {
    getOrders: (shopID, callBack) => {
        let sql = 'SELECT DISTINCT orders.id as orderID, registeredusers.fullName, registeredusers.email, registeredusers.phone, usersaddress.flatNo, usersaddress.complex, usersaddress.landmark, usersaddress.street, usersaddress.area, usersaddress.city,products.id as productID, products.name, products.price, products.image, orderedproducts.quantity FROM orders INNER JOIN registeredusers ON orders.user_id=registeredusers.id INNER JOIN usersaddress ON registeredusers.id=usersaddress.user_id INNER JOIN orderedproducts ON orderedproducts.order_id=orders.id INNER JOIN products on products.id=orderedproducts.product_id INNER JOIN shop ON products.shop_id = shop.id WHERE shop.id = ?'

        let insertSql = [shopID]

        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    cancle: (param, callBack) => {
        let sql = 'UPDATE orders SET orderStatus = 1 WHERE orders.id = ?'

        let insertSql = [param]

        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    cancle: (param, callBack) => {
        let sql = 'UPDATE orders SET orderStatus = 0 WHERE orders.id = ?'

        let insertSql = [param]

        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    }
}