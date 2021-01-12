const mysql = require('mysql');

let connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'gillian',
    password : 'password',
    database : 'JobBoard'
});

connection.connect(function(err) {
    if (err) throw err;
});

module.exports = connection;