var connection =  new require('./kafka/Connection');
//topics files
//var signin = require('./services/signin.js');
var Login = require('./services/login.js');
var Signin=require('./services/Signin');
var Search=require('./services/Search.js');
var Filter=require('./services/Filter');
var Detail=require('./services/Detail');
var Book=require('./services/Book');
var Travellertrip=require('./services/TripBoardTraveller');
var ListPropertyPAge1=require('./services/ListPropertyPage1');
var ListPropertyPage2=require('./services/ListPropertyPage2');
var ListPropertyPage3=require('./services/ListPropertyPage3');
var ListPropertyPage4=require('./services/ListPropertyPage4');
var ListPropertyPage5=require('./services/ListPropertyPage5');
var OwnerPropertyListed=require('./services/OwnerPropertyListed');
var OwnerPropertyBooked=require('./services/OwnerPropertyBooked');
var EditProfile=require('./services/EditProfile');
var GetProfileDetails=require('./services/GetProfileDetails');
var ImageUpload=require('./services/ImageUploadChange');
var FilterDate=require('./FilterDate');

function handleTopicRequest(topic_name,fname){
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    //console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name +" ", fname);
        console.log(JSON.stringify(message.value));
        var data = JSON.parse(message.value);
        
        fname.handle_request(data.data, function(err,res){
            console.log('after handle'+res);
            var payloads = [
                { topic: data.replyTo,
                    messages:JSON.stringify({
                        correlationId:data.correlationId,
                        data : res
                    }),
                    partition : 0
                }
            ];
            producer.send(payloads, function(err, data){
                console.log(data);
            });
            return;
        });
        
    });
}


handleTopicRequest("post-book",Signin)
handleTopicRequest("post-book",Search)
handleTopicRequest("test",Login)
handleTopicRequest("filter",Filter)
handleTopicRequest("Detail",Detail)
handleTopicRequest("Book",Book)
handleTopicRequest("Traveller",Travellertrip)
handleTopicRequest("ListPropertyPage1",ListPropertyPAge1)
handleTopicRequest("ListPropertyPage2",ListPropertyPage2)
handleTopicRequest("ListPropertyPage3",ListPropertyPage3)
handleTopicRequest("ListPropertyPage4",ListPropertyPage4)
handleTopicRequest("ListPropertyPage5",ListPropertyPage5)
handleTopicRequest("OwnerPropertyBooked",OwnerPropertyBooked)
handleTopicRequest("OwnerPropertyListed",OwnerPropertyListed)
handleTopicRequest("GetProfileDetails",GetProfileDetails)
handleTopicRequest("EditProfile",EditProfile)
handleTopicRequest("ImageUploadChange",ImageUpload)
handleTopicRequest("FilterDate",FilterDate)