const express = require('express');
const router = express.Router();
const jwt = require('../services/jwt')

const JobBoard = require('../models/jobBoard');

router.post('/postQueston', jwt.middleware, function(req, res) {
	let newQuestion = new JobBoard({
        title : req.body.title,
        author : req.body.userID,
        description : req.body.body,
        matchedStatus : 0,
    })
    newQuestion.save((err, data) => {
		if(err){
			res.send(err);
		} else {
            res.send({message : "Question Posted"});
			console.log("created");
		}
	});
});

router.post('/acceptJob', jwt.middleware, function(req, res) {

})

module.exports = router;
