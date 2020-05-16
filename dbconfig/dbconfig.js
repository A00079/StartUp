const mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD, 
    database: process.env.DATABASE
});

pool.getConnection((err) =>{
    if(err){
        console.log("Error Connecting to DB.",err);
    }else{
        console.log("Successfully Connected to DB.");
    }
});

module.exports = pool;



