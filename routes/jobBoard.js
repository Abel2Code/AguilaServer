const express = require('express');
const router = express.Router();
const jwt = require('../services/jwt')

const JobBoard = require('../models/jobBoard');

router.post('/postQuestion', function(req, res) {
	let newQuestion = new JobBoard({
				title : req.body.title,
				category : req.body.category,
				author : req.body.author,
        description : req.body.description,
				schoolOnly : false,
				matchedStatus : false,
				mentor: "5aca84fa4111971e30e8e5dc",
				messages: [{
					isMentor: false,
					message: req.body.description
				}, {
					isMentor: true,
					message: "Hey Abel. I am sorry to hear that but don't worry, you are not alone! I went through a similar situation. I recommend..."
				}]
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

// Debugging Tools:
// TODO: Delete

router.get('/job', function(req, res) {
	JobBoard.find(function(err, students) {
            if (err)
                res.send(err)
 						else
			     			res.json(students);
        });
});

router.get('/conversations/:author_id', function(req, res) {
	JobBoard.find({
    author: req.params.author_id
  }, function(err, students) {
            if (err)
                res.send(err)
 						else
			     			res.json(students);
        });
});

router.delete('/job/:student_id', function(req, res) {
      JobBoard.remove({
          _id : req.params.student_id
      }, function(err, review) {
			if(err){
				res.send(err);
			} else {
				res.send("User Deleted");
			}
      });
 });

module.exports = router;
