const pool = require('../../dbconfig/dbconfig');

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

    get : (callback) => {
        let sql = 'SELECT * FROM registeredusers';
        pool.query(sql, (err, results, fields) => {
           if(err) {
               return callback(err)
           } 
           return callback(null, results)
        })
    }

};
