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

// Routes
app.use('/api/enduser/user', require('./enduser/user/user.routes'));
app.use('/api/admin/product', require('./admin/product/product.routes'));



if(process.env.NODE_ENV === 'production'){

    app.use(express.static(path.join(__dirname, 'build')));
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}


app.listen(port, () =>{
    console.log(`Server Running at ${port}`);
});