const mysql = require('mysql');


var pool = mysql.createPool({
    connectionLimit: 10,
    multipleStatements:true,
    host: 'localhost',
    user: 'id13504834_jamesbond',
    password: 'J1a2m3e4s5b6o7n8d9@', 
    database: 'id13504834_safebasket'
});


pool.getConnection((err) =>{
    if(err){
        console.log("Error Connecting to DB.",err);
    }else{
        console.log("Successfully Connected to DB.");
    }
});

module.exports = pool;



