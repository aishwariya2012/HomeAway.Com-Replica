'use strict';
// Include our packages in our main server file
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var morgan = require('morgan');
var passport = require('passport');
var cors = require('cors');
var port = 8080;
var app = express();
var config = require('./config/settings');
var jwt = require('jsonwebtoken');
var crypt = require('./app/crypt');
var db = require('./app/db');
// Set up middleware
var requireAuth = passport.authenticate('jwt', {session: false});


// Use body-parser to get POST requests for API use
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());

// Log requests to console
app.use(morgan('dev'));


console.log("here");
//require('./app/routes')(app);
app.use(passport.initialize());

// Bring in defined Passport Strategy
require('./config/passport')(passport);

// Register new users
app.post('/register', function (request, response) {
    console.log(request.body);
    if (!request.body.username || !request.body.password) {
        response.status(400).json({success: false, message: 'Please enter username and password.'});
    } else {
        var newUser = {
            username: request.body.username,
            password: request.body.password
        };

        // Attempt to save the user
        db.createUser(newUser, function (res) {
            response.status(201).json({success: true, message: 'Successfully created new user.'});
        }, function (err) {
            console.log(err);
            return response.status(400).json({success: false, message: 'That username address already exists.'});
        });
    }
});

// Authenticate the user and get a JSON Web Token to include in the header of future requests.
app.post('/login', function (request, response) {
    db.findUser({
        username: request.body.username
    }, function (res) {
        var user = {
            id: res.id,
            username: res.username,
        };

        // Check if password matches
        crypt.compareHash(request.body.password, res.password, function (err, isMatch) {
            if (isMatch && !err) {
                // Create token if the password matched and no error was thrown
                var token = jwt.sign(user, config.secret, {
                    expiresIn: 10080 // in seconds
                });
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
});

//Protected authenticated route with JWT
app.get('/protectedRoute', requireAuth, function (request, response) {
    response.send('Your User id is: ' + request.user.id + ', username is: ' + request.user.username + '.');
});

// Home route. We'll end up changing this to our main front end index later.
app.get('/', function (req, res) {
    res.send('This Route is not yet defined.');
});





// Start the server
app.listen(port);
console.log('Your server is running on port ' + port + '.');
