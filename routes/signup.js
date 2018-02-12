const express = require('express'); 
const router = express.Router();
const bcrypt = require('bcrypt');

const Student = require('../models/student');
const Major = require('../models/major');
const College = require('../models/college')
const amazonStorage = require('../services/amazonStorage');
const jwt = require('../services/jwt');

router.post('/signup', amazonStorage.upload.single('pic'), function(req, res) {
	const saltRounds = 10;
	const hash = bcrypt.hashSync(req.body.password, saltRounds);
	console.log(req.body);
	console.log(req.file);

	let newUser = new Student({
		email: req.body.email,
		phoneNumber: req.body.phoneNumber,
		password: hash,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		profilePhotoLink: req.file.location,
		school: req.body.school,
		classStanding: req.body.year,
		majors: req.body.majors,
		minors:	req.body.minors
	});

	newUser.save((err, data) => {
		if(err){
			res.send(err);
		} else {
			jwt.signLoginToken(req.body.email,(token) => {
				res.send({message:"User Created", token: token});
			})
		}
	});  
});

router.get('/majors', function(req, res) {
	Major.find(function(err, majors) {
		if (err)
			res.send(err);
		else
			res.json(majors); 
	});
})

router.get('/schools', function(req, res){
	College.find(function(err, schools) {
		if (err){
			res.send(err);
		}else{
			res.json(schools);
		}
	})
})

// Debugging tools - Will be modified for admin portal PLEASE DELETE
router.get('/students', function(req, res) {
	Student.find(function(err, students) {
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
// End Debugging tools

module.exports = router;