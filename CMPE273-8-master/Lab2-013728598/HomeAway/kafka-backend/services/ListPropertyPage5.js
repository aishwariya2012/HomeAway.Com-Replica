var {PropertyData}=require('../../BackEnd/models/PropertyData');
function handle_request(msg, callback){
    console.log("Inside ListPropertyPage5",msg);
    
    var property=new PropertyData({
        AddressLine1:msg.Address1,
        AddressLine2:msg.Address2,
        City:msg.City,
        Country:msg.Country,
        ZipCode:msg.Zip,
        Headline:msg.HeadLine,
        Description:msg.Description,
        PropertyType:msg.PropertyType,
        BedRoom:msg.BedRoom,
        BathRoom:msg.BathRoom,
        Accomodates:msg.Accomodates,
        ImageName:msg.ImageName,
        AvailableStartDate:msg.StartDate,
        AvailableEndDate:msg.EndDate,
        Currency:msg.Currency,
        RentalRates:msg.Rate,
        Night:msg.Stay,
        Booking:0,
        Start:'',
        End:'',
        PropertyListedBy:msg.username,
        PropertyBookedBy:''



});
property.save().then((docs)=>{
console.log("Row Created : ",docs);
callback(null,"ok");
},(err)=>{
console.log("Error Creating Property");

})


}
    exports.handle_request = handle_request;