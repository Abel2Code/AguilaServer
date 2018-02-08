const express = require('express'); 
const router = express.Router();
const bcrypt = require('bcrypt');

const Student = require('../models/student');

router.post('/signup', function(req, res) {
	const saltRounds = 10;
	const hash = bcrypt.hashSync(req.body.password, saltRounds);
	
	Student.create({
		email: req.body.email,
		phoneNumber: req.body.phoneNumber,
		password: hash,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		profilePhotoLink: req.body.profilePhotoLink,
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