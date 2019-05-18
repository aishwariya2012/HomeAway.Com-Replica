var {PropertyData}=require('../../BackEnd/models/PropertyData');
function handle_request(msg, callback){
   
   
    console.log("Inside Search Request:",msg);
    PropertyData.find({
        City:msg.Search,
       Accomodates: { $gte: msg.Guest },
    AvailableStartDate:{$lte:msg.Start},
         AvailableEndDate:{$gte:msg.End}


    }).then(docs=>{
       
        const propertydata={
            Properties:docs,
            SearchParameter:msg
        }
        console.log((propertydata));
       callback(null,(propertydata));
       console.log(docs);
    },(err) => {
        console.log(err);
       
    })

}

exports.handle_request = handle_request;