var {userdata}=require('../../BackEnd/models/userinfo')
function handle_request(msg, callback){
console.log(msg);
userdata.findOne({
    FirstName:msg.firstname
}).then(docs=>{
    //res.code = "200";
    callback(null,(docs));
   
   console.log("response value",docs);
   //console.log("data"+booksdummy);
},(err) => {
    console.log(err);
   
})
}
exports.handle_request = handle_request;