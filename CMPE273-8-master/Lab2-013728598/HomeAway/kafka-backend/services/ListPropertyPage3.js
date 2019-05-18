function handle_request(msg, callback){
    console.log("Inside ListPropertyPage3");
    
    console.log(msg);
properties={
    ImageName:msg
}
console.log(properties);
  
    callback(null,(properties));
    }
    
    exports.handle_request = handle_request;