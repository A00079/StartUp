require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var multer = require('multer');
const app = express();
const path = require('path');
const port = process.env.PORT || 5000;
const shortId = require('shortid')

// Image handler 
const fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, shortId() + '-' + file.originalname)
    }
})

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}


// Middlewares
app.use(cors());
app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'))
app.use('/images', express.static(path.join(__dirname, 'images')));

// socket IO


// ENDUSER Routes
app.use('/api/enduser/user', require('./enduser/user/user.routes'));
app.use('/api/enduser/details', require('./enduser/details/details.routes'));
app.use('/api/enduser/product', require('./enduser/product/product.routes'));
app.use('/api/enduser/order', require('./enduser/order/order.routes'));

// SHOPUSER  routes
app.use('/api/shopuser/shop', require('./shopuser/shop/shop.routes'))
app.use('/api/shopuser/product', require('./shopuser/product/product.routes'))
app.use('/api/shopuser/auth', require('./shopuser/shopAuth/shopAuth.routes'))
app.use('/api/shopuser/order', require('./shopuser/order/order.routes'))

// ADMIN routes
app.use('/api/adminuser/product', require('./admin/product/product.routes'));
app.use('/api/adminuser/shop', require('./admin/shop/shop.routes'));
app.use('/api/adminuser/auth', require('./admin/adminAuth/adminAuth.routes'));
app.use('/api/adminuser/category', require('./admin/category/category.routes'));


if (process.env.NODE_ENV === 'production') {

    if (process.env.NODE_ENV === 'production') {
        app.get(/.*/, (req, res) => {
            res.sendFile(path.join(__dirname, 'build', 'index.html'));
        });
    }
}

const server = app.listen(port, () => {
    console.log(`Server Running at ${port}`);
});

const io = require('./socket').init(server)
io.on('connection', socket => {
    console.log('client connected')
})
