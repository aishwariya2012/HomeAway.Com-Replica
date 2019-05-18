var {PropertyData}=require('../../BackEnd/models/PropertyData');
function handle_request(msg, callback){
   
   
    console.log("Inside Search Request:",msg);
    PropertyData.find({
       PropertyBookedBy:msg.username


    }).then(docs=>{
     
        
       
       callback(null,(docs));
       console.log(docs);
    },(err) => {
        console.log(err);
       
    })

}

exports.handle_request = handle_request;