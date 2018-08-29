var express  = require('express');

var app      = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cors = require('cors');

require('dotenv').config();

var server = require('http').createServer(app);
// var io = require('socket.io').listen(server);
var io = require('socket.io').listen(server);
global.io = io;

var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/Aguila', { useNewUrlParser: true })
.then(()=>{})
.catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    process.exit();
});

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin","http://localhost:8100");
   res.header("Access-Control-Allow-Credentials", "true");
   res.header(
       "Access-Control-ALlow-Headers",
       "Origin, X-Requested-With, Content-Type, Accept, Authorization"
   );
   if (req.method === "OPTIONS") {
       res.header(
           "Access-Control-Allow-Methods",
           "PUT, POST, PATCH, GET, DELETE"
       );
       return res.status(200).json({});
   }
   next(); // send the request to the next middleware
});



const loginRoute = require('./routes/login');
const signupRoute = require('./routes/signup');
const emailValidationRoute = require('./routes/emailValidation');
const jobBoardRoute = require('./routes/jobBoard');
const messageRoute = require('./routes/message');
const rewardRoute = require('./routes/reward');
const surveyRoute = require('./routes/survey');

app.use('/api', loginRoute);
app.use('/api', signupRoute);
app.use('/api', emailValidationRoute);
app.use('/api', jobBoardRoute);
app.use('/api', messageRoute);
app.use('/api', rewardRoute);
app.use('/api', surveyRoute);


server.listen(port);
console.log("App listening on port " + port);
