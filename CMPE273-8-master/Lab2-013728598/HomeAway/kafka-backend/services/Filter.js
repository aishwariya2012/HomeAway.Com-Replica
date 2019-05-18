var {PropertyData}=require('../../BackEnd/models/PropertyData');
function handle_request(msg, callback){
   
   
    console.log("Inside Filter Request:",msg);

    PropertyData.find({
        City:msg.Search,
        BedRoom: { $gte: msg.BedRoom },
        AvailableStartDate:{$lte:msg.Start},
        AvailableEndDate:{$gte:msg.End},
        RentalRates:{$gte:msg.RentalRates},



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