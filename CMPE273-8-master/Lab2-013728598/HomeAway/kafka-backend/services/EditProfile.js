var {userdata}=require('../../BackEnd/models/userinfo')
function handle_request(msg, callback){
var firstname=msg.firstname;

    var lastname=msg.lastname;
    console.log(msg);
    userdata.findOneAndUpdate({
        FirstName:firstname,
        //UserName:msg.earlier

    },
    {$set:
        {
            FirstName:firstname,
            LastName:lastname,
            AboutMe:msg.AboutMe,
            City:msg.City,
            Company:msg.Company,
            School:msg.School,
            HomeTown:msg.HomeTown,
            Languages:msg.Language,
            Gender:msg.Gender

        }
    },function(err,doc){
        if (err){

        }        
        else{
        console.log("Docs",doc);
        callback(null,doc)}
    }
    );
}
exports.handle_request = handle_request;