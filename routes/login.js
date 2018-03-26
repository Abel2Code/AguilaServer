const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('../services/jwt')

const User = require('../models/user');

router.post('/login', function(req, res) {
	User.find({email: req.body.email}, function(err, student){
        console.log(req.body);
        if(student.length == 0 || !bcrypt.compareSync(req.body.password, student[0].password)){
        	console.log("not found");
            res.send({valid: 0});
        } else{
            jwt.signLoginToken(req.body.email, (token) =>{
                res.send({valid: 1, token: token});
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
