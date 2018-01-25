const express = require('express'); 
const router = express.Router();
const bcrypt = require('bcrypt');

const Student = require('../models/student');

router.post('/login', function(req, res) {
	
	Student.find({username: req.body.username.toLowerCase()}, function(err, student){
        if(student.length == 0 || !bcrypt.compareSync(req.body.password, student[0].password))
            res.send("INVALID USERNAME OR PASSWORD");
        else
            // Insert Found Code Here
            res.send("FOUND");
    });
});

module.exports = router;