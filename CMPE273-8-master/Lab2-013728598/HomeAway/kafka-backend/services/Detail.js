var {PropertyData}=require('../../BackEnd/models/PropertyData');
function handle_request(msg, callback){
   
   
    console.log("Inside Search Request:",msg);
    PropertyData.find({
        _id:msg.id
       // Accomodates: { $gte: msg.Guest },
        //AvailableStartDate:{$lte:msg.Start},
        //  AvailableEndDate:{$gte:msg.End}


    }).then(docs=>{
       
        const propertydata={
            Properties:docs,
          
        }
        console.log((propertydata));
       callback(null,(propertydata));
       console.log(docs);
    },(err) => {
        console.log(err);
       
    })

}

exports.handle_request = handle_request;