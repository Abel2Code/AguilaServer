const constants = require('../services/constants');

const express = require('express');
const router = express.Router();
const jwt = require('../services/jwt')

const JobBoard = require('../models/jobBoard');

const socketExports = require('../global/socketio.js');
const createConversationSocket = socketExports.createConversationSocket;

router.post('/postQuestion/:key', function(req, res) {
	jwt.verifyToken(req.params.key, (valid) => {
		if(valid){
			jwt.decodeToken(req.params.key, (err, token) => {
				if(err){
					res.json(err);
					return;
				}
				if(token.isMentor){
					res.json(constants.BAD_TOKEN);
					return;
				}
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
		}});
});

router.get('/unansweredJobs/:key', function(req, res){
	jwt.verifyToken(req.params.key, (valid) => {
		if(valid){
			jwt.decodeToken(req.params.key, (err, token) => {
				if(err){
					res.json(err);
					return;
				}
				if(!token.isMentor){
					res.json(constants.BAD_TOKEN);
					return;
				}

				JobBoard.find({matchedStatus: false}, function(err, students) {
					if(err)
						res.send(err);
					else
						res.json(students);
				});
			});
		}});

});

router.put('/startConversation/:key', function(req, res){
	jwt.verifyToken(req.params.key, (valid) => {
		if(valid){
			jwt.decodeToken(req.params.key, (err, token) => {
				if(err){
					res.json(err);
					return;
				}
				JobBoard.findOne({_id: req.body.id }, function (err, job){
					if(job.matchedStatus){
						job.messages.push({
							isMentor: false,
							message: req.body.description
						});

						createConversationSocket(job._id);


						job.messages.push({
							isMentor: true,
							message: req.body.response
						});

						job.save();
						// TODO: Create Socket Here

						res.json({success: true});
					} else {
						res.json({success: false});
					}
				});
			});
		}});
});

router.put('/jobMatch/:key', function(req, res){
	jwt.verifyToken(req.params.key, (valid) => {
		if(valid){
			jwt.decodeToken(req.params.key, (err, token) => {
				if(err){
					res.json(err);
					return;
				}
			JobBoard.findOne({_id: req.body.id }, function (err, job){
				if(job.matchedStatus){
					res.json({success: false});
				} else {
					job.matchedStatus = true;
					job.mentor = token.id;
				 	job.save();
					res.json({success: true});
				}
			});
		});
		} else {
			res.json(constants.BAD_TOKEN)
		}
	});

});



// Debugging Tools:
// TODO: Delete

router.get('/job/:key', function(req, res) {
	jwt.verifyToken(req.params.key, (valid) => {
		if(valid){
			JobBoard.find(function(err, students) {
		            if (err)
		                res.send(err)
		 						else
					     			res.json(students);
		        });
		} else {
			res.json(constants.BAD_TOKEN)
		}
	})

});

router.get('/conversations_a/:key', function(req, res) {
	jwt.verifyToken(req.params.key, (valid) => {
		if(valid){
			jwt.decodeToken(req.params.key, (err, token) => {
				if(err){
					res.json(err);
					return;
				}
				JobBoard.find({
				  author: token.id
				}, function(err, students) {
				          if (err)
				              res.send(err)
										else
						     			res.json(students);
				      });

			})
		} else {
			res.json(constants.BAD_TOKEN)
		}
	});
});

router.get('/conversations_m/:key', function(req, res) {
	jwt.verifyToken(req.params.key, (valid) => {
		if(valid){
			jwt.decodeToken(req.params.key, (err, token) => {
				if(err){
					res.json(err);
					return;
				}
				JobBoard.find({
			    mentor: token.id
			  }, function(err, students) {
			            if (err){
			                res.send(err)
											return;
			 						} else{
						     			res.json(students);
									}
			        });
			})
		} else {
			res.json(constants.BAD_TOKEN)
		}
	});

});

router.delete('/job/:job_id/:key', function(req, res) {
	jwt.verifyToken(req.params.key, (valid) => {
		if(valid){
			JobBoard.remove({
          _id : req.params.job_id
      }, function(err, review) {
			if(err){
				res.send(err);
			} else {
				res.send("User Deleted");
			}
      });
		} else {
			res.json(constants.BAD_TOKEN)
		}
	});
 });

module.exports = router;
