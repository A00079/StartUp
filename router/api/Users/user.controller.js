require('dotenv').config();
const { create } = require('../../api/Users/user.service');

module.exports = {
    createUser : (req,res) =>{
        var body = req.body;
        create(body, (err, results) =>{
            if(err){
                return res.status(500).json({
                    success: 0,
                    error: err,
                    message: 'DataBase Connection Error'
                });
            }
            return res.status(200).json({
                success: 1,
                message: results
            });
        });
    }
}