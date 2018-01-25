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

module.exports = router;