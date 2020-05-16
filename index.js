require('dotenv').config();
const express    = require('express');
const bodyParser = require('body-parser');
const cors       = require('cors');
const app        = express();
const routes     = require('./router/api/Users/user.routes');
const path       = require('path');
const db         = require('./dbconfig/dbconfig');
const port  = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));
app.use('/api/users', routes);

if(process.env.NODE_ENV === 'production'){

    app.use(express.static(path.join(__dirname, 'build')));
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, 'build', 'index.html'));
    });
}

app.listen(port, () =>{
    console.log(`Server Running at ${port}`);
});