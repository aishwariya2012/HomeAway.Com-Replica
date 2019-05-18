var {PropertyData}=require('../../BackEnd/models/PropertyData');
function handle_request(msg, callback){
   
   
    console.log("Inside Book:",msg);
    PropertyData.findOneAndUpdate({
        _id:msg.PropertyID
    


    },{
        $set:
            {
                
                PropertyBookedBy:msg.Username,
                Start:msg.Start,
                End:msg.End,
                Booking:1
              
            }
        },
            function(err,doc){
                if (err){
        console.log(err);
                }        
                else{
                console.log("Docs",doc);
                callback(null,doc);
            }
        }
            

    )
}

exports.handle_request = handle_request;