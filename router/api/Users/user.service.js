const pool = require('../../../dbconfig/dbconfig');

module.exports = {
    create : (data, callBack) =>{
        let sql = 'INSERT INTO registeredusers (token) VALUES (?)';
        pool.query(sql,[data.token],(err,results,fields) =>{
            if(err){
                return callBack(err)
            }
            return callBack(null,results);
        });
    }
};
