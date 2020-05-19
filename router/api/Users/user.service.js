const pool = require('../../../dbconfig/dbconfig');

module.exports = {
    create : (data, callBack) =>{
        let sql = 'INSERT INTO registeredusers (fullname,email,token,subscribed) VALUES (?,?,?,?)';
        pool.query(sql,[data.fullname,data.email,data.token,data.subscribed],(err,results,fields) =>{
            if(err){
                return callBack(err)
            }
            return callBack(null,results);
        });
    },
    read : (data, callBack) =>{
        let sql = 'SELECT email FROM registeredusers WHERE email = ?';
        pool.query(sql,[data.email],(err,results) =>{
            if(err){
                return callBack(err)
            }
            return callBack(null,results);
        });
    }
};
