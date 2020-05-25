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



// ENDUSER Routes
app.use('/api/enduser/user', require('./enduser/user/user.routes'));

app.use('/api/shopuser/shop', require('./shopuser/shop/shop.routes'))
app.use('/api/shopuser/product', require('./shopuser/product/product.routes'))
// app.use('/api/shopuser/order', require('./shopuser/order'))

// ADMIN routes
app.use('/api/adminuser/product', require('./admin/product/product.routes'));
app.use('/api/adminuser/shop', require('./admin/shop/shop.routes'));
app.use('/api/adminuser/auth', require('./admin/adminAuth/adminAuth.routes'));

// error handler
// app.use((req, res, next) => {
//     const error  = new Error('Not found')
//     error.status = 404
//     next(error)
// })

// app.use((error, req, res, next)=>{
//     res.status(error.status || 500)
//     res.json({
//         error : error.status || 500,
//         message : error.message
//     })
// })


if (process.env.NODE_ENV === 'production') {

    if (process.env.NODE_ENV === 'production') {
        app.get(/.*/, (req, res) => {
            res.sendFile(path.join(__dirname, 'build', 'index.html'));
        });
    }
}

app.listen(port, () => {
    console.log(`Server Running at ${port}`);
});