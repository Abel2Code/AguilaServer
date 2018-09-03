const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('../services/jwt')

const User = require('../models/user');

router.post('/login', function(req, res) {
	User.findOne({email: req.body.email}, function(err, student){
        if(student.length == 0 || !bcrypt.compareSync(req.body.password, student.password)){
            res.send({valid: 0});
        } else{
            jwt.signLoginToken(student._id, req.body.email, student.mentorStatus, (token) =>{
								res.send({valid: student.mentorStatus == true ? 2: 1, token: token, id: student._id});
            });
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
