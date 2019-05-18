
var db = require('../../BackEnd/app/db.js');
var config = require('../../BackEnd/config/settings');
var jwt = require('jsonwebtoken');
var crypt = require('../../BackEnd/app/crypt');
var passport = require('passport');
var requireAuth = passport.authenticate('jwt', {session: false});
require('../../BackEnd/config/passport')(passport);

function handle_request(msg, callback){
    console.log("Inside Login Request and Parameters Are",msg);
    
    db.findUser({
        username: msg.username
    }, function (res) {
      console.log(res);
  if(res==null){
    callback(null,null);
  }
  else{

        // Check if password matches
        crypt.compareHash(msg.password,res.PasswordEncrypt , function (err, isMatch) {
            if (isMatch && !err) {
                // Create token if the password matched and no error was thrown
                var token = jwt.sign(res.toJSON(), config.secret, {
                    expiresIn: 10080 // in seconds
                });
         
                const resData = {
                    authFlag : true,
                    user: res,
                    token:token
                }
                callback(null,resData);
               
              console.log('Logged in Succesfully');
            }
            else{
                 callback(null,null)
            } 
    });
    
  
}
    
});
}

   



exports.handle_request = handle_request;