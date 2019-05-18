'use strict';

var crypt = require('./crypt');
var config = require('../config/settings');
var {userdata} = require('../models/userinfo');
var {mongoose} = require('../mongoose');




var db = {};

db.createUser = function (user, successCallback, failureCallback) {
    var passwordHash;
    
    crypt.createHash(user.password, function (res) {
        passwordHash = res;
        console.log(passwordHash);
        var userinfo1 = new userdata({
            FirstName : user.firstname,
            LastName:user.lastname,
            UserName:user.username,
            Password:user.password,
            PasswordEncrypt:passwordHash,
            AboutMe:'',
            City:'',
            Company:'',
            School:'',
            HomeTown:'',
            Languages:'',
            Gender:'',
            Profilepic:'Profile.png'
           
           
        });
      
             userinfo1.save().then((docs)=>{
            console.log("Row Created : ",docs);
            successCallback();
    
        },(err)=>{
            console.log("Error Creating Book");
            failureCallback(err);
            res.sendStatus(400).end();
        })
        
     
    }, function (err) {
        console.log(err);
        failureCallback();
    });
};
db.findUser = async function (user,successCallback,failureCallback, res) {
  
    userdata.findOne({
        UserName:user.username
    }).then(docs=>{
      
   
        successCallback(docs);
   
       
    },(err) => {
        console.log(err);
        res.code = "400";
        res.end("Bad Request");
    })
 
};


module.exports = db;