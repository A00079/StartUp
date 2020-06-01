const pool = require('../../dbconfig/dbconfig')

module.exports = {
    create: (userID, mainData, products, callBack) => {
        // Begin transaction
        pool.getConnection((err, connection) => {
            connection.beginTransaction(err => {
                if (err) {
                    throw err
                }
                let ordersSql = 'INSERT INTO orders (user_id, purAmt) VALUES (?,?)'
                let insertOrdersSql = [userID, mainData.purAmt]
                connection.query(ordersSql, insertOrdersSql, (err, results) => {
                    if (err) {
                        return connection.rollback(_ => {
                            throw err
                        })
                    }

                    let lastId = results.insertId

                    let orderedProductSql = 'INSERT INTO orderedproducts (order_id, product_id, quantity) VALUES ?'

                    let values = products.reduce((o, a) => {
                        let ini = []
                        ini.push(lastId)
                        ini.push(a.productId)
                        ini.push(a.quantity)
                        o.push(ini)
                        return o
                    }, [])

                    connection.query(orderedProductSql, [values], (err, results) => {
                        if (err) {
                            return connection.rollback(_ => {
                                throw err
                            })
                        }
                        connection.commit(err => {
                            if (err) {
                                connection.rollback(_ => {
                                    throw err
                                })
                            }
                            connection.release()
                            callBack(null, results)
                        })
                    })
                })
            })
        })
    },

    getOrders:(userID, callBack) => {
        let sql = 'SELECT orderedproducts.order_id, products.image, products.name AS productName , products.price, orderedproducts.quantity, orders.purAmt, orders.created_at, shop.name AS shopName FROM orderedproducts INNER JOIN products on orderedproducts.product_id = products.id INNER JOIN orders ON orders.id = orderedproducts.order_id INNER JOIN shop ON shop.id = products.shop_id WHERE orders.user_id = ?'

        let insertSql = [userID]

        pool.query(sql, [insertSql], (err, results) => {
            if(err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    }
}