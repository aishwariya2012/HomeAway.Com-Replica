'use strict';
// Include our packages in our main server file
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var port = 3001;
var kafka = require('./kafka/client');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
//var {userdata} = require('./models/userinfo');
var {mongoose}=require('./mongoose');
var {questions}=require('./models/QNA');



var ImageInsert;
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });
 
console.log("here");
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      
      //const newFilename = `${path.extname(file.originalname)}`;
      cb(null, file.originalname);
    
    
    },
    
  });
  const upload = multer({ storage });

  app.post('/upload', upload.any(), (req, res) => {
    
    kafka.make_request('ImageUploadChange',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
        
                res.json({
                    updatedList:results
                });
                
                res.end();
            }
        
    });
    

});
 
  app.post('/', upload.any(), (req, res) => {
    //console.log("Req : ",req);
    console.log("Res : ",res.file);
    console.log(req.body);
    ImageInsert=req.body.description;
    
    console.log(ImageInsert);
    
    res.send();
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
app.post('/Traveller', function (req, res) {
    kafka.make_request('test',req.body, function(err,results){
        console.log('in result');
       // console.log(results.user.FirstName);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            if(results==null){
            res.end("null");
            }
            else{
            console.log("Inside else");
            //res.cookie('cookie',req.body.username,{maxAge: 900000, httpOnly: false, path : '/'});
            //res.cookie('FirstName',results.user.FirstName,{maxAge: 900000, httpOnly: false, path : '/'});
            
                res.json({
                    updatedList:results
                });
              
                res.end();
            }
        }
    });
});

app.post('/SignUpEmail', function (req, res) {
    kafka.make_request('post-book',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    updatedList:results
                });

                res.end();
            }
        
    });
});

app.post('/HomeDisplay',function(req,res){
    kafka.make_request('post-book',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
        
                res.json({
                    updatedList:results
                });
                
                res.end();
            }
        
    });
})
app.post('/filter',function(req,res){
    kafka.make_request('filter',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    updatedList:results
                });

                res.end();
            }
        
    });
})
app.post('/Filter1',function(req,res){
    kafka.make_request('FilterDate',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    updatedList:results
                });

                res.end();
            }
        
    });
})
app.post('/Detail',function(req,res){
    kafka.make_request('Detail',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    updatedList:results
                });

                res.end();
            }
        
    });
})
app.post('/Book',function(req,res){
    kafka.make_request('Book',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    updatedList:results
                });

                res.end();
            }
        
    });
})
app.post('/TravellerTrip',function(req,res){
    kafka.make_request('Traveller',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
            
                res.json({
                    updatedList:results
                });

                res.end();
            }
        
    });
})
app.post('/properties',function(req,res){
    kafka.make_request('ListPropertyPage1',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    updatedList:results
                });

                res.end();
            }
        
    });
})
app.post('/ListDetails',function(req,res){
    kafka.make_request('ListPropertyPage2',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    updatedList:results
                });

                res.end();
            }
        
    });
})
app.post('/Availbility',function(req,res){
    kafka.make_request('ListPropertyPage4',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    updatedList:results
                });

                res.end();
            }
        
    });
})
app.post('/ImageInsert',function(req,res){
    kafka.make_request('ListPropertyPage3',ImageInsert, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    updatedList:results
                });

                res.end();
            }
        
    });
})
app.post('/RentalRates',function(req,res){
    kafka.make_request('ListPropertyPage5',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    updatedList:results
                });

                res.end();
            }
        
    });
})


app.post('/OwnerProperty',function(req,res){
    kafka.make_request('OwnerPropertyListed',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    updatedList:results
                });

                res.end();
            }
        
    });
})

app.post('/download/:file(*)',(req, res) => {
    console.log("Inside download file");
    var file = req.params.file;
    var fileLocation = path.join(__dirname + '/uploads',file);
    var img = fs.readFileSync(fileLocation);
    var base64img = new Buffer(img).toString('base64');

    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(base64img);
  });

  app.post('/EditProfile', function (req, res) {
    kafka.make_request('EditProfile',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    updatedList:results
                });

                res.end();
            }
        
    });
});
app.post('/OwnerPropertiesBooked', function (req, res) {
    kafka.make_request('OwnerPropertyBooked',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    updatedList:results
                });

                res.end();
            }
        
    });
});
app.post('/display1', function(req,res){
    kafka.make_request('GetProfileDetails',req.body, function(err,results){
        console.log('in result');
        console.log(results);
        if (err){
            console.log("Inside err");
            res.json({
                status:"error",
                msg:"System Error, Try Again."
            })
        }else{
            console.log("Inside else");
                res.json({
                    updatedList:results
                });

                res.end();
            }
        
    });
   
    
});
app.post('/question',function(req,res){
    console.log("in booking method");
                console.log(req.body);
                var question=new questions({
                 PropertyId:req.body.PropertyId,
                 OwnerName:req.body.OwnerName,
                 TravellerName:req.body.TravellerName,
                 Headline:req.body.Headline,
                 PropertyTopic:req.body.propertyTopic,
                 PropertyDescription:req.body.Quesdecription
                })
                //console.log("data properties ",properties);
                question.save().then((question)=>{
                    console.log("Question created : ",question);
                    res.send("200");
                },(err)=>{
                console.log(err);
                console.log("Error Creating Property");
                res.send("400"); 
                })
       
    
});
app.post('/getTravellerQuestionDetails',function(req,res){

    console.log("Inside fetching questionare for traveller");

    questions.find({TravellerName:req.body.travellername},function(err,result){
        if(err)
        {
            console.log(err);
            res.send("400");
            return;
        }
        else{
            console.log(result);
            res.writeHead(200,{
                'Content-Type' : 'application/json'
                })
                                   
                res.end(JSON.stringify(result));
        }
    })
})
app.post('/getOwnerQuestionDetails',function(req,res){

    console.log("Inside fetching questionare for owner");
    console.log(req.body);

    questions.find({OwnerName:req.body.ownername},function(err,result){
        if(err)
        {
            console.log(err);
            res.send("400");
            return;
        }
        else{
            console.log(result);
            res.writeHead(200,{
                'Content-Type' : 'application/json'
                })
            res.end(JSON.stringify(result));
        }
    })
})

app.post('/answer',function(req,res){

    console.log("Inside answer section for owner");
    console.log(req.body);

    questions.findOneAndUpdate({_id:req.body.questionID},{
        $set:
        {
            Answer:req.body.answer,
        }
    },
    {
        upsert:true
    }).then((result)=> {
        console.log("Updated Document:",result);
        res.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        res.end('InsertSuccess');
    },(err)=>{
        console.log(err);
        console.log("Error Creating Book");
        res.writeHead(400,{
        'Content-Type' : 'text/plain'
        })
        res.end("Error creating book");
    })
})
// Start the server
app.listen(port);
console.log('Your server is running on port ' + port + '.');
