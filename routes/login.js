const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Student = require('../models/student');

router.post('/login', function(req, res) {
	console.log(req.body.username);
	Student.find({username: req.body.username.toLowerCase()}, function(err, student){
        if(student.length == 0 || !bcrypt.compareSync(req.body.password, student[0].password)){
        	console.log("not found");
            res.send({"response": "INVALID USERNAME OR PASSWORD"});
        } else{
            // Insert Found Code Here
        	console.log(student.username + " has logged in");
            res.send({"response": "FOUND"});
        }
    });
});

router.put('/change_password', function(req, res) {
  // Check if Valid Token

  // Make sure passwords match
  if(req.body.password1 != req.body.password2){
    res.send("Passwords do not match.")
  } else {
		//Hash and Salt Password
		const saltRounds = 10;
		const hash = bcrypt.hashSync(req.body.password1, saltRounds)
		
		//This will not trigger if invalid token.
		Student.findOneAndUpdate({email: req.body.email}, {password: hash});
  }

});

module.exports = router;
