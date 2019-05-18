function handle_request(msg, callback){
    console.log("Inside ListPropertyPage2");
    
    
    console.log(msg);
     
     properties={
        HeadLine:msg.HeadLine,
        Description:msg.Description,
        PropertyType:msg.PropertyType,
        BedRoom:msg.BedRoom,
        BathRoom:msg.BathRoom,
        Accomodates:msg.Accomodates
     }
     console.log(properties);
  
    callback(null,(properties));
    }
    
    exports.handle_request = handle_request;