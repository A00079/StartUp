const pool = require('../../dbconfig/dbconfig');

module.exports = {

    details: (userID, callBack) => {
        let sql = 'SELECT registeredusers.fullName, registeredusers.phone, usersaddress.flatNo, usersaddress.complex, usersaddress.landmark, usersaddress.street, usersaddress.area, usersaddress.city, usersaddress.district FROM registeredusers INNER JOIN usersaddress ON registeredusers.id = usersaddress.user_id WHERE user_id = ?'
        pool.query(sql, userID, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results)
        })
    },

    phone: (data, userID, callBack) => {
        let sql = 'UPDATE registeredusers SET phone = ?  WHERE id = ?';
        let insertSql = [data.phone, userID]
        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results);
        });
    },

    address: (data, userID, callBack) => {
        let sql = 'INSERT INTO usersaddress (user_id, flatNo, complex, landmark, street, area, city, district, state) VALUES (?,?,?,?,?,?,?,?,?)';
        let insertSql = [userID, data.flatNo, data.complex, data.landmark, data.street, data.area, data.city, data.district, data.state]
        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results);
        });
    },

    edit: (data, userID, callBack) => {
        let sql = 'UPDATE usersaddress SET flatNo = ?, complex = ?, landmark = ?, street = ?, area = ?, city = ?, district = ?, state = ? WHERE user_id = ?';
        let insertSql = [data.flatNo, data.complex, data.landmark, data.street, data.area, data.city, data.district, data.state,userID]
        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results);
        });
    },
};