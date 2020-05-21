require('dotenv').config();
const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const app        = express();
const path       = require('path');
const port  = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

// ENDUSER Routes
app.use('/api/enduser/user', require('./enduser/user/user.routes'));

// SHOP Routes
app.use('/api/shopuser/auth', require('./shopuser/shopAuth/shopAuth.routes'))
app.use('/api/shopuser/shop', require('./shopuser/shop/shop.routes'))
// app.use('/api/shopuser/product', require('./shopuser/product'))
// app.use('/api/shopuser/order', require('./shopuser/order'))

// ADMIN routes
app.use('/api/adminuser/product', require('./admin/product/product.routes'));
app.use('/api/adminuser/shop', require('./admin/shop/shop.routes'));
app.use('/api/adminuser/auth', require('./admin/adminAuth/adminAuth.routes'));




if(process.env.NODE_ENV === 'production'){

    app.use(express.static(path.join(__dirname, 'build')));
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}


app.listen(port, () =>{
    console.log(`Server Running at ${port}`);
});