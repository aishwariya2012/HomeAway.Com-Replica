var mongoose =require('mongoose');

var questions= mongoose.model('Questions',{

    PropertyId:{
        type:String

    },
    OwnerName:{
        type:String
    },
    TravellerName:{
        type:String
    },
    Headline:{
        type:String
    },
    PropertyTopic:{
        type:String
    },
    PropertyDescription:{
        type:String
    },
    Answer:{
        type:String
    }



},'Questions')
module.exports = {questions};