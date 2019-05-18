var mongoose =require('mongoose');

var userdata= mongoose.model('userinfo',{
   
    FirstName : {
        type : String
    },
    LastName : {
        type : String
    },
    UserName :{
        type : String
    },
    PasswordEncrypt:{
        type:String
    },
    Password:{
type:String
    },
    AboutMe:{
        type:String
    },
    City:{
        type:String
    },
    Company:{
        type:String
    },
    Gender:{
        type:String
    },
    HomeTown:{
        type:String
    },
    Languages:{
      type:String
    },
    School:{
  type:String
    },
    Profilepic:{
        type:String
    }


},'userinfo')

module.exports = {userdata};