const pool = require('../../dbconfig/dbconfig');

module.exports = {
    create: (data, callBack) => {
        let sql = 'INSERT INTO registeredusers (fullname,email,token,subscribed) VALUES (?,?,?,?)';
        pool.query(sql, [data.fullname, data.email, data.token, data.subscribed], (err, results, fields) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results);
        });
    },

    register: (fullname, email, userPassword, callBack) => {
        let sql = 'INSERT INTO registeredusers (fullname,email,userPassword) VALUES (?,?,?)';
        pool.query(sql, [fullname, email, userPassword], (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results);
        });
    },


    login: (email, callBack) => {
        let sql = 'SELECT * FROM registeredusers WHERE email = ?';
        let insertSql = [email]
        pool.query(sql, insertSql, (err, results) => {
            if (err) {
                return callBack(err)
            }
            return callBack(null, results);
        });
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
};
