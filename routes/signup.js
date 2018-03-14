const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const User = require('../models/user');

const amazonStorage = require('../services/amazonStorage');
const jwt = require('../services/jwt');

router.post('/signup', amazonStorage.upload.single('pic'), function(req, res) {
	const saltRounds = 10;
	const hash = bcrypt.hashSync(req.body.password, saltRounds);

	let newUser = new User({
		email: req.body.email,
		password: hash,
		name: req.body.name,
		school: req.body.school,
		classStanding: req.body.classStanding,
		shareInfo: req.body.shareInfo,
	});

	newUser.save((err, data) => {
		if(err){
			res.send(err);
		} else {
			jwt.signLoginToken(req.body.email,(token) => {
				res.send({message : "User Created", token : token});
			})
			console.log("created");
		}
	});
});

// Debugging tools - Will be modified for admin portal PLEASE DELETE
router.get('/students', function(req, res) {
	Student.find(function(err, students) {
            if (err)
                res.send(err)
 			else
           		res.json(students);
        });
});

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
