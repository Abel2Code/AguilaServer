const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

const AuthPin = require('../models/AuthPin');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ConnectSageOfficial@gmail.com',
    pass: 'L@#cx!23'
  }
});

// Send user email with random pin
router.post('/email_request', function(req, res){
	// Validate email
	if(req.body.email == undefined){
		res.send("Error");
	}
	// Generate a pin
	console.log("Generating a pin for " + req.body.email);
	let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let length = 6;
	var result = '';
	for (var i = length; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];

	AuthPin.create({
		email: req.body.email,
		pin: result,
	}, function(err){
		if(err){
			res.send(err);
		} else {
			// Send user an email
			let mailOptions = {
			  from: 'ConnectSageOfficial@gmail.com',
			  to: req.body.email,
			  subject: 'Aguila Email Confirmation',
			  text: 'Your pin is ' + result
			};

			transporter.sendMail(mailOptions, function(error, info){
			  if (error) {
			    console.log(error);
			  } else {
			    console.log('Email sent: ' + info.response);
			  }
			});

			res.send({response: "Pin Created"});
		}
	});
});

router.delete('/validate_pin', function(req, res) {
  AuthPin.remove({
 			email : req.body.email,
      pin : req.body.pin
 	}, function(err, review) {
 	if(err || review.n == 0){
 		res.send("Pin or Email Not Found");
  } else{
    if(req.body.newUser == true){
      res.send({
				message : "Welcome " + req.body.email + ". SEND JWT FOR creating account"
			});
    } else {
      res.send({
				message: "Welcome " + req.body.email + ". SEND JWT FOR reset password."
			});
    }
 	}
 	});
});



// Debugging tools - Will be modified for admin portal PLEASE DELETE

router.get('/pins', function(req, res) {

	AuthPin.find(function(err, students) {
            if (err)
                res.send(err)
 						else
			     			res.json(students);
        });
});

router.delete('/pin/:pin_id', function(req, res) {
	AuthPin.remove({
 			_id : req.params.pin_id
 	}, function(err, review) {
 	if(err){
 		res.send(err);
 	} else {
 		res.send("Pin Deleted");
 	}
 	});
});
// End Debugging tools

module.exports = router;
