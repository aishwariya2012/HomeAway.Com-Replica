var mongoose =require('mongoose');


var ObjectId = mongoose.Schema.Types.ObjectId;
var PropertyData=mongoose.model('PropertyDetails',{
 
    Booking:{
        type:Number
    },
    Start:{
        type:String
    },
    End:{
        type:String
    },
    AddressLine1:{
        type:String
    },
    AddressLine2:{
        type:String
    },
    City:{
        type:String
    },
   Country:{
        type:String
    },
  ZipCode:{
    type:Number
},
Headline:{
    type:String
},
Description:{
    type:String
},
PropertyType:{
    type:String
},
BedRoom:{
    type:Number
},
BathRoom:{
    type:Number
},
Accomodates:{
    type:Number
},
AvailableStartDate:{
    type:Date
},
AvailableEndDate:{
    type:Date
},

Currency:{
    type:String
},
RentalRates:{
    type:Number
},
Night:{
    type:String
},
PropertyListedBy:
{
    type:String
},
PropertyBookedBy:
{
type:String
},
ImageName:{
    type:String
}

},'PropertyDetails')

module.exports = {PropertyData};