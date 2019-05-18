var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100,
    port: '3306',
    host: 'localhost',
    user: 'root',
    password: '',
    database: '273lab1'
})


module.exports = pool;