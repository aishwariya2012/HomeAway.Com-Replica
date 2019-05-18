function handle_request(msg, callback){
    console.log("Inside ListPropertyPage4");
    
    console.log(msg);
     
      
     properties={
        StartDate:msg.Start,
        EndDate:msg.End
     }  
     console.log(properties);
     
  
    callback(null,(properties));
    }
    
    exports.handle_request = handle_request;