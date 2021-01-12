const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');
app = express();
port = 3000;

const mc = mysql.createConnection({
    host     : 'localhost',
    user     : 'gillian',
    password : 'password',
    database : 'JobBoard'
});

mc.connect();

app.listen(port);

console.log(`RESTful API server started on ${port}`);

app.use(cors());

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

const routes = require('./app/routes/appRoutes.js');
routes(app);