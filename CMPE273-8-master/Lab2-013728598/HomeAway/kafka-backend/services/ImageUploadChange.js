var {userdata}=require('../../BackEnd/models/userinfo')
function handle_request(msg, callback){
console.log("console",msg);
   
userdata.findOneAndUpdate({
  
    FirstName:msg.username

},
{$set:
    {
       
       Profilepic:msg.Filename

    }
},function(err,doc){
    if (err){
console.log(err);
    }        
    else{
    console.log("Docs",doc);
   callback(null,"Success");
}
}
);}
exports.handle_request = handle_request;