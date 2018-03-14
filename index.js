var express  = require('express');

var app      = express();                            
var mongoose = require('mongoose');  
var bodyParser = require('body-parser'); 

require('dotenv').config();

var server = require('http').createServer(app);

var port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost/Aguila');

app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
// app.use(bodyParser.json({type: 'application/vnd.api+json'}));

app.use(function(req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
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


app.listen(port);
console.log("App listening on port " + port);
