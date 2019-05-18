var {PropertyData}=require('../BackEnd/models/PropertyData');
function handle_request(msg, callback){
   
   
    console.log("Inside Filter dateRequest:",msg);

    PropertyData.find({
        PropertyListedBy:msg.username,
      
        AvailableStartDate:{$lte:msg.filterstartdate},
        AvailableEndDate:{$gte:msg.filterenddate},
    



    }).then(docs=>{
        
   
       callback(null,docs);
     
    },(err) => {
       
    })

}

exports.handle_request = handle_request;