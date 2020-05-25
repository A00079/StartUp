const userService = require('./user.service');

module.exports = {
    createUser: (req, res) => {
        var body = req.body;
        userService.create(body, (err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'DataBase Connection Error'
                });
            }
            return res.status(200).json({
                status: 'success',
                data: results
            });
        });
    },

    getUsers: (req, res) => {
        userService.get((err, results) => {
            if (err) {
                return res.status(500).json({
                    status: 'error',
                    error: err,
                    message: 'DataBase Connection Error'
                });
            }
            return res.status(200).json({
                status: 'success',
                results: results.length,
                data: results
            });
        }); 
    }



}