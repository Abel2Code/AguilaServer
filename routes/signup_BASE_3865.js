const express = require('express'); 
const router = express.Router();
const bcrypt = require('bcrypt');

const Student = require('../models/student');

router.post('/signup', function(req, res) {
	const saltRounds = 10;
	const hash = bcrypt.hashSync(req.body.password, saltRounds);
	
	Student.create({
		birth_day: req.body.birth_day,
		birth_month: req.body.birth_month,
		birth_year: req.body.birth_year,
		bio: req.body.bio,
		current_school: req.body.current_school,
		first_name: req.body.first_name,
		last_name: req.body.last_name,
		major: req.body.major,
		password: hash,
		username: req.body.username.toLowerCase()
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