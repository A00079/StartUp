require('dotenv').config();
const { create, read } = require('../../api/Users/user.service');

module.exports = {
    createUser : (req,res) =>{
        var body = req.body;
        create(body, (err, results) =>{
            if(err){
                return res.status(500).json({
                    success: 0,
                    error: err,
                    message: err.code
                });
            }
            return res.status(200).json({
                success: 1,
                message: results
            });
        });
    },
    verifyUserLogin : (req,res) =>{
        var body = req.body;
        read(body, (err, results) =>{
            if(err){
                return res.status(500).json({
                    success: 0,
                    error: err,
                    message: 'Authentication Error...'
                });
            }
            return res.status(200).json({
                success: results.length,
                message: results
            });
        });
    }
}