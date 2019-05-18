
var db = require('../../BackEnd/app/db.js');

function handle_request(msg, callback){
   
   
    
   
        if (!msg.username || !msg.password) {
           // response.status(400).json({success: false, message: 'Please enter username and password.'});
        } else {
            var newUser = {
                username: msg.username,
                password: msg.password,
                firstname:msg.firstname,
                lastname:msg.lastname
    
            };
    
            // Attempt to save the user
            db.createUser(newUser, function (res) {
                const response={
                    success: true, message: 'username address done1',AccountCreated:true
                }
               return callback(null,response);
             
            }, function (err) {
                console.log(err);
               
            });
        }
 
    
}

exports.handle_request = handle_request;


