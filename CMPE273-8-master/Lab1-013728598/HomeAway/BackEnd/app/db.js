'use strict';
var mysql = require('mysql');
var crypt = require('./crypt');
var config = require('../config/settings');
var pool = require('../pool');
var db = {};
// Creating a connection object for connecting to mysql database
var connection = mysql.createConnection({
    host: config.database_host,
    limit:config.connectionLimit,
    port: config.database_port,
    user: config.database_user,
    password: config.database_password,
    database: config.database_name,
    //socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
});

//Connecting to database
pool.getConnection(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    
});

db.createUser = function (user, successCallback, failureCallback) {
    var passwordHash;
    
    crypt.createHash(user.password, function (res) {
        passwordHash = res;
        var sqlQuery = "INSERT INTO  userinfo(FirstName,LastName,UserName,Password,PasswordEncrypt) VALUES ( " + 
    mysql.escape(user.firstname) + " , " + mysql.escape(user.lastname ) + " , "+ mysql.escape(user.username ) + ","+
    mysql.escape(user.password ) + ", "+mysql.escape(passwordHash)+") ";
        console.log(sqlQuery);
        var sql2="INSERT INTO userinfo2(FirstName,LastName) VALUES ("  + 
        mysql.escape(user.firstname) + " , " + mysql.escape(user.lastname ) + " )";
        connection.query(sql2,function(err){
             if (err){
                 console.log("in");
             }
        });
        connection.query(sqlQuery,function (err) {
                if (err) {
                    console.log("in");
                    console.log(err);
                    failureCallback(err);
                    return;
                }
                console.log("Success");
                successCallback();
            });
    }, function (err) {
        console.log(err);
        failureCallback();
    });
};

db.findUser = function (user, successCallback, failureCallback) {
    var sqlQuery = "SELECT * FROM userinfo WHERE userinfo.UserName = '" + user.username + "';";
    console.log(sqlQuery);
    connection.query(sqlQuery, function (err, rows) {
        if (err) {
           failureCallback(err);
           console.log("in");
            return;
        }
        if (rows.length > 0) {
            successCallback(rows[0])
            console.log("insidesucces");
           
        } else {
            failureCallback('User not found.');
            console.log("Wrong arf");
        }
    });
};

module.exports = db;