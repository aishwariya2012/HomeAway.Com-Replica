'use strict';
// Include our packages in our main server file
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var cors = require('cors');
var port = 3001;
var app = express();
var config = require('./config/settings');
var jwt = require('jsonwebtoken');
var crypt = require('./app/crypt');
var db = require('./app/db');
var mysql = require('mysql');
var pool = require('./pool');
//const bodyParser = require('body-parser');
const multer = require('multer');
//const uuidv4 = require('uuid/v4');
const path = require('path');
const fs = require('fs');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});
var Address1;
var Address2;
var City;
var Country;
var Zip;
var HeadLine,Description,PropertyType,BedRoom,Accomodates,BathRoom,StartDate,EndDate,Currency,RentalRates,Night;
var ImageInsert,id;

// Use body-parser to get POST requests for API use
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });
// Log requests to console
app.use(morgan('dev'));


//console.log("here");
//require('./app/routes')(app);
app.use(passport.initialize());

// Bring in defined Passport Strategy
require('./config/passport')(passport);


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads');
    },
    filename: (req, file, cb) => {
      
      //const newFilename = `${path.extname(file.originalname)}`;
      cb(null, file.originalname);
    
    
    },
    
  });
  var con1=mysql.createConnection({
    port: '3306',
    host: 'localhost',
    user: 'root',
    password: '',
    database: '273lab1'
  });
  con1.connect(function(err){
    if(err) throw err;
    console.log("Connected!");
  })
  app.post('/withoutpoollogin',function(request,response)
  {
      console.log("Inside Login Post Request");
          var username = request.body.username;
          var password = request.body.password;
          var sql = "SELECT *  FROM userinfo WHERE UserName = " + 
                  mysql.escape(username) + "and Password = " + mysql.escape(password);
  
      
              con1.query(sql,function(err,result){
                  if(err){
                      console.log("Inavlid Credentials");
                      res.writeHead(400,{
                          'Content-Type' : 'text/plain'
                      })
                      res.end("Invalid Credentials");
                  }else{
                      console.log("successful login");
                      //req.session.user = result;
                      var users=JSON.stringify(result);
                      var user=JSON.parse(users);
                      
  
                          response.writeHead(200,{
                              'Content-Type' : 'text/plain'
                          })
                          response.end("Successful Login");
                  }
              });
          
      
  });
  const upload = multer({ storage });
  //const app = express();
  app.post('/', upload.any(), (req, res) => {
    //console.log("Req : ",req);
    console.log("Res : ",res.file);
    console.log(req.body);
    ImageInsert=req.body.description;
    console.log(ImageInsert);
    
    res.send();
});
  app.post('/download/:file(*)',(req, res) => {
    console.log("Inside download file");
    var file = req.params.file;
    var fileLocation = path.join(__dirname + '/uploads',file);
    var img = fs.readFileSync(fileLocation);
    var base64img = new Buffer(img).toString('base64');

    res.writeHead(200, {'Content-Type': 'image/png' });
    res.end(base64img);
  });
// Register new users
app.post('/SignUpEmail', function (request, response) {
    
   
    if (!request.body.username || !request.body.password) {
        response.status(400).json({success: false, message: 'Please enter username and password.'});
    } else {
        var newUser = {
            username: request.body.username,
            password: request.body.password,
            firstname:request.body.firstname,
            lastname:request.body.lastname

        };

        // Attempt to save the user
        db.createUser(newUser, function (res) {
           
            return response.status(200).json({success: true, message: 'username address done'});
        }, function (err) {
            console.log(err);
            return response.status(400).json({success: false, message: 'That username address already exists.'});
        });
    }
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
app.post('/Traveller', function (request, response) {
    console.log(request.body);
    db.findUser({
        username: request.body.username
    }, function (res) {
        var user = {
            id: res.id,
            username: res.username,
            
        };
        console.log("Firstname is"+res.FirstName);

        // Check if password matches
        crypt.compareHash(request.body.password, res.PasswordEncrypt, function (err, isMatch) {
            if (isMatch && !err) {
                // Create token if the password matched and no error was thrown
                var token = jwt.sign(user, config.secret, {
                    expiresIn: 10080 // in seconds
                });
                response.cookie('cookie',res.FirstName,{maxAge: 900000, httpOnly: false, path : '/'});
                response.cookie('cookieU',res.UserName,{maxAge: 900000, httpOnly: false, path : '/'});
                response.status(200).json({success: true, token: 'JWT ' + token});
            } else {
                response.status(401).json({
                    success: false,
                    message: 'Authentication failed. Passwords did not match.'
                });
            }
        }, function (err) {
            console.log(err);
            response.status(401).json({success: false, message: 'Authentication failed. User not found.'});
        });
    }, function (err) {
        console.log(err);
        response.status(401).json({success: false, message: 'Authentication failed. User not found.'});
    });
})

//Protected authenticated route with JWT
app.get('/protectedRoute', requireAuth, function (request, response) {
    response.send('Your User id is: ' + request.user.id + ', username is: ' + request.user.username + '.');
});

// Home route. We'll end up changing this to our main front end index later.
app.get('/', function (req, res) {
    res.send('This Route is not yet defined.');
});
//Route to handle Post Request Call
app.post('/properties',function(req,res){
    console.log(req.body);
    console.log("Inside Location Post Request");
        Address1 = req.body.Address1;
         Address2 = req.body.Address2;
         City = req.body.City;
        Country= req.body.Country;
        Zip=req.body.Zip;

        res.end("Ok");  
        
    
});
app.post('/ListDetails',function(req,res){
    console.log(req.body);
     HeadLine=req.body.HeadLine;
     Description=req.body.Description;
     PropertyType=req.body.PropertyType;
     BedRoom=req.body.BedRoom;
     BathRoom=req.body.BathRoom;
     Accomodates=req.body.Accomodates;
      
       

        res.end("Ok");  
});
app.post('/Availbility',function(req,res){
    console.log(req.body);
     StartDate=req.body.Start;
     EndDate=req.body.End;
      
       

        res.end("Ok");  
});
app.post('/ImageInsert',function(req,res){
    console.log(req.body);

      
       

        res.end("Ok");  
});
app.post('/TravellerDash',function(req,res){
    console.log(req.body);
    console.log("Inside Traveller property Request:");
    var sql = "SELECT *  FROM listproperty WHERE City = " + 
    mysql.escape(req.body.Search) + "and StartDate <= " + mysql.escape(req.body.Start) + " and EndDate >=" + mysql.escape(req.body.End) + " and Accomodates >=" + mysql.escape(req.body.Guest)+"and Booking=0" ;
  
    console.log(sql);
    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");   
                }else{
                    res.writeHead(200,{
                        'Content-Type' : 'application/json'
                    })
                   
                    res.end(JSON.stringify(result));
                   
                }
            });
        }
    })
    
});
app.post('/RentalRates',function(req,res){
    console.log(req.body);
    Currency=req.body.Currency;
    RentalRates=req.body.Rate;
    Night=req.body.Stay;
    var sql = "INSERT INTO  listproperty(UserName,Booking,AddressL1, AddressL2, City, Country, ZipCode, HeadLine, Description, PropertyType, BedRoom, Accomodates, BathRoom, StartDate, EndDate, Currency, RentalRates, Night,ImageNames) VALUES ( " + 
    mysql.escape(req.body.USername) + " ," + 0 + "," + mysql.escape(Address1) + ", " + mysql.escape(Address2) + " , "+ mysql.escape(City ) + ","+
    mysql.escape(Country ) + ", "+mysql.escape(Zip)+","+mysql.escape(HeadLine)+","+mysql.escape(Description)+","+mysql.escape(PropertyType)+","+mysql.escape(BedRoom)+","+mysql.escape(Accomodates)+","+mysql.escape(BathRoom)+","+mysql.escape(StartDate)
    +","+mysql.escape(EndDate)+","+mysql.escape(Currency)+","+mysql.escape(RentalRates)+","+mysql.escape(Night)+","+mysql.escape(ImageInsert)+") ";
    console.log("Insertion of list Property data to db:"+sql);
    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            console.log("Could not get connection object");
            res.end("Could Not Get Connection Object");
        }else
        {
    con.query(sql,function(err,result){
        if(err){
            console.log(err);
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Error While inserting data");
        }else{
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end('InsertSuccess');
       
        }
        });
        }
    });
      
       

        
});
app.post('/display1', function(req,res){
    console.log("display");
    var sql = "SELECT * FROM userinfo2 WHERE userinfo2.FirstName = " +mysql.escape(req.body.firstname)+ "";
    console.log(sql);
    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Could Not Get Connection Object");
        }else{
            con.query(sql,function(err,result){
                if(err){
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Could Not Get Connection Object");   
                }else{
                    res.writeHead(200,{
                        'Content-Type' : 'application/json'
                    })
                   
                    res.end(JSON.stringify(result));
                    console.log(JSON.stringify(result));
                }
            });
        }
    })
    
});
app.post('/EditProfile',function(req,res){
    console.log(req.body);
    var firstname=req.body.firstname;
    var lastname=req.body.lastname;
    var sql = "UPDATE userinfo SET userinfo.FirstName = " +mysql.escape( firstname )+ ",userinfo.LastName = " +mysql.escape( lastname )+ " WHERE userinfo.UserName="+mysql.escape(req.body.earlier)+"";
    var sql1 = "UPDATE userinfo2 SET userinfo2.FirstName = " +mysql.escape( firstname )+ ",userinfo2.LastName = " +mysql.escape( lastname )+ ",userinfo2.AboutMe= " +mysql.escape( req.body.AboutMe )+ ",userinfo2.City = " +mysql.escape( req.body.City )+ ",userinfo2.Company = " +mysql.escape( req.body.Company )+ ",userinfo2.School = " +mysql.escape( req.body.School )+ ",userinfo2.Hometown = " +mysql.escape( req.body.HomeTown )+ ",userinfo2.Languages = " +mysql.escape( req.body.Language )+ 
    ",userinfo2.Gender = " +mysql.escape( req.body.Gender )+ " WHERE userinfo2.FirstName="+mysql.escape(req.body.firstname)+"";
    console.log(sql);
    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            console.log("Could not get connection object");
            res.end("Could Not Get Connection Object");
        }else
        {
            con.query(sql1,function(err){
                if (err){
                    console.log("in");
                }
           });
    con.query(sql,function(err,result){
        if(err){
            console.log(err);
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            res.end("Error While inserting data");
        }else{
            res.writeHead(200,{
                'Content-Type' : 'text/plain'
            })
            res.end('InsertSuccess');
       
        }
        });
        
        }
        
    });
      
       

        
});

app.post('/HomeDisplay',function(req,res){
    
    console.log("Inside Search property Request:");
        var sql = "SELECT *  FROM listproperty WHERE City = " + 
        mysql.escape(req.body.Search) + "and StartDate <= " + mysql.escape(req.body.Start) + " and EndDate >=" + mysql.escape(req.body.End) + " and Accomodates >=" + mysql.escape(req.body.Guest);

    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            console.log(err);
          
            res.end("Could Not Get Connection Object");
        }else{  
            con.query(sql,function(err,result){
                if(err){
                    
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Property not available");
                }else{
                    console.log("Properties Searched Avail:");
                   
                    var PropREsult=JSON.stringify(result);
                  
                        //console.log(PropREsult);
                        res.cookie('Search',req.body.Search,{maxAge: 900000, httpOnly: false, path : '/'});
                        res.cookie('Start', req.body.Start,{maxAge: 900000, httpOnly: false, path : '/'});
                        res.cookie('End',req.body.End,{maxAge: 900000, httpOnly: false, path : '/'});
                        res.cookie('Guest',req.body.Guest,{maxAge: 900000, httpOnly: false, path : '/'});

                        res.writeHead(200,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end(JSON.stringify(result));
                }
            });
        }
    });
    
});

app.post('/TravellerTrip',function(req,res){
    
    console.log("Inside Booked property Request:");
        var sql = "SELECT *  FROM listproperty WHERE TravellerName= " +mysql.escape(req.body.username)+""; 
       

    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            console.log(err);
          
            res.end("Could Not Get Connection Object");
        }else{  
            con.query(sql,function(err,result){
                if(err){
                    
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Property not available");
                }else{
                    console.log("Trips Done Avail:");
                   
                    var PropREsult=JSON.stringify(result);
                  
                        console.log(PropREsult);

                        res.writeHead(200,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end(JSON.stringify(result));
                }
            });
        }
    });
    
});



app.post('/Book',function(req,res){
    var propertyID=req.body.PropertyID;
    var date1 =  req.body.Start;
    var date2 = req.body.End;
  
    console.log("Inside Booking Property Request:");
        var sql = "UPDATE listproperty SET listproperty.TravellerName = " +mysql.escape( req.body.Username )+ " ,Booking=1, Start="+mysql.escape(date1)+",End="+mysql.escape(date2)+" WHERE listproperty.PropertyID="+mysql.escape(propertyID)+"";

    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            console.log(err);
          
            res.end("Could Not Get Connection Object");
        }else{  
            con.query(sql,function(err,result){
                if(err){
                    
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Property not available");
                }else{
                    console.log("Booking Done");
                    res.writeHead(200,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end("Booking Done");
                }
            });
        }
    });
    
});

app.post('/OwnerProperty',function(req,res){
    
    console.log("Inside Booked property Request:");
        var sql = "SELECT *  FROM listproperty WHERE UserName= " +mysql.escape(req.body.username)+""; 
       

    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            console.log(err);
          
            res.end("Could Not Get Connection Object");
        }else{  
            con.query(sql,function(err,result){
                if(err){
                    
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Property not available");
                }else{
                    console.log("Properties posted Avail:");
                   
                    var PropREsult=JSON.stringify(result);
                  
                        console.log(PropREsult);

                        res.writeHead(200,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end(JSON.stringify(result));
                }
            });
        }
    });
    
});

app.post('/OwnerPropertiesBooked',function(req,res){
    
    console.log("Inside Booked property Request:");
        var sql = "SELECT *  FROM listproperty WHERE UserName= " +mysql.escape(req.body.username)+" and Booking=1"; 
       

    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            console.log(err);
          
            res.end("Could Not Get Connection Object");
        }else{  
            con.query(sql,function(err,result){
                if(err){
                    
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Property not available");
                }else{
                    console.log("Properties posted Booked:");
                   
                    var PropREsult=JSON.stringify(result);
                  
                        console.log(PropREsult);

                        res.writeHead(200,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end(JSON.stringify(result));
                }
            });
        }
    });
    
});
app.post('/id',function(req,res){
    id=req.body.id;
    console.log(id);
    res.end("ok");
});

app.post('/Detail',function(req,res){
    console.log("inside detail");
    var sql = "SELECT *  FROM listproperty WHERE PropertyID="+mysql.escape(id)+"" ; 
   
   

    pool.getConnection(function(err,con){
        if(err){
            res.writeHead(400,{
                'Content-Type' : 'text/plain'
            })
            console.log(err);
          
            res.end("Could Not Get Connection Object");
        }else{  
            con.query(sql,function(err,result){
                if(err){
                    
                    res.writeHead(400,{
                        'Content-Type' : 'text/plain'
                    })
                    res.end("Property not available");
                }else{
                    console.log("Properties posted Booked:");
                   
                    var PropREsult=JSON.stringify(result);
                  
                        console.log(PropREsult);

                        res.writeHead(200,{
                            'Content-Type' : 'text/plain'
                        })
                        res.end(JSON.stringify(result));
                }
            });
        }
    });
 
});
// Start the server
app.listen(port);
console.log('Your server is running on port ' + port + '.');