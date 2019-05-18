function handle_request(msg, callback){
console.log("Inside ListPropertyPage1");


properties=  {

Address1 : msg.Address1,
Address2 : msg.Address2,
City : msg.City,
Country: msg.Country,
Zip:msg.Zip

}
console.log(properties);
callback(null,(properties));
}

exports.handle_request = handle_request;