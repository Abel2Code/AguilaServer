var express  = require('express');
var app      = express();                            
var mongoose = require('mongoose');  
var bodyParser = require('body-parser'); 

require('dotenv').config();

var server = require('http').createServer(app);

var port = process.env.PORT || 3000;
 
mongoose.connect('mongodb://localhost/Aguila');

// //Populate Database
// Run Once
// const Major = require('./models/major');
// const College = require('./models/college');
// let major1 = new Major({
//     major: 'Computer Science',
//     school: 'Computer Science'
// });
// major1.save((err, data) => {
//     if (err) throw err;
// });
// let major2 = new Major({
//     major: 'Biology',
//     school: 'Science'
// });

// major2.save((err, data) => {
//     if (err) throw err;
// });

// let major3 = new Major({
//     major: 'Buisness',
//     school: 'Buisness'
// });
// major3.save((err, data) => {
//     if (err) throw err;
// });

// let college1 = new College({
//     collegeName: 'University of California Irvine',
//     state: 'CA',
//     city: 'Irvine'
// });
// college1.save((err, data) => {
//     if (err) throw err;
// });

// let college2 = new College({
//     collegeName: 'University of California Los Angeles',
//     state: 'CA',
//     city: 'Los Angeles'
// });
// college2.save((err, data) => {
//     if (err) throw err;
// });


// let college3 = new College({
//     collegeName: 'California State Univeristy Los Angeles',
//     state: 'CA',
//     city: 'Los Angeles'
// });
// college3.save((err, data) => {
//     if (err) throw err;
// });


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

app.use('/api', loginRoute);
app.use('/api', signupRoute);

app.listen(port);
console.log("App listening on port " + port);