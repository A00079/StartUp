const jwt = require('jsonwebtoken')
const config = require('../../config')

module.exports = {
  isAuth: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      // Remove Bearer from string
      token = token.slice(7);
      jwt.verify(token, config.usersecret, (err, decoded) => {
        if (err) {
          return res.json({
            status: 'error',
            message: "Invalid Token..."
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.json({
        status: 'error',
        message: "Access Denied! Unauthorized User"
      });
    }
  }
};