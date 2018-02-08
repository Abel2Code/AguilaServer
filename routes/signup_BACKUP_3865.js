const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');

const Student = require('../models/student');
<<<<<<< HEAD
const AuthPin = require('../models/AuthPin');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'ConnectSageOfficial@gmail.com',
    pass: 'L@#cx!23'
  }
});

=======
const amazonStorage = require('../services/amazonStorage');
>>>>>>> origin/master

router.post('/signup', amazonStorage.upload.single('profilePhoto'), function(req, res) {
	const saltRounds = 10;
	const hash = bcrypt.hashSync(req.body.password, saltRounds);

	Student.create({
		email: req.body.email,
		phoneNumber: req.body.phoneNumber,
		password: hash,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		school: req.body.school,
		classStanding: req.body.classStanding,
		// majors: ,
		// minors:
	}, function(err){
		if(err){
			res.send(err);
		} else {
			res.send("User Created")
		}
	})
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

			res.send("Pin Created");
		}
	});
});

// Debugging tools - Will be modified for admin portal PLEASE DELETE
router.get('/students', function(req, res) {
	Student.find(function(err, students) {
<<<<<<< HEAD


            if (err)
                res.send(err)
 			else
           		res.json(students);
        });
});

router.get('/pins', function(req, res) {

	AuthPin.find(function(err, students) {
            if (err)
                res.send(err)
 						else
			     			res.json(students);
        });
})

router.delete('/student/:student_id', function(req, res) {
      Student.remove({
          _id : req.params.student_id
      }, function(err, review) {
			if(err){
				res.send(err);
			} else {
				res.send("User Deleted");
			}
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
=======
		if (err)
			res.send(err)
		else
			res.json(students); 
	});
})

router.delete('/student/:student_id', function(req, res) {
	Student.remove({
		_id : req.params.student_id
	}, function(err, review) {
		if(err){
			res.send(err);
		} else {
			res.send("User Deleted");	
		}
	});
	
});  
>>>>>>> origin/master
// End Debugging tools

module.exports = router;
