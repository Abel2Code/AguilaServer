const express = require('express');
const router = express.Router();

const Messages = require('../models/messages');
const JobBoard = require('../models/jobBoard')

router.get('/job/:key', function(req, res) {
  jwt.verifyToken(req.params.key, (valid) => {
		if(valid){
			jwt.decodeToken(req.params.key, (err, token) => {
				if(err){
					res.json(err);
					return;
				}
        Messages.find({
          users: {
            "$in": [token.id]
          }
        }, function(err, messages) {
          if (err) {
            res.send(err);
            return;
          } else {
            res.send(messages);
          }
        });
      });
    }});
})

router.put('/sendMessage/:key', function(req, res) {
  jwt.verifyToken(req.params.key, (valid) => {
		if(valid){
			jwt.decodeToken(req.params.key, (err, token) => {
				if(err){
					res.json(err);
					return;
				}
        JobBoard.findOne({_id: req.body.job}, function(err, jobBoard){
          if(err){
            res.send(err);
            return;
          }
          if(!(token.id == jobBoard.author || token.id == jobBoard.mentor)){
            res.send('Invalid Credentials');
            return;
          }
          let isMentor = true;
          if(token.id == jobBoard.author){
            isMentor = false;
          } else{
            console.log(req.body.userId, jobBoard.author)
          }
          jobBoard.messages.push({
            isMentor: isMentor,
            message: req.body.message
          })

          jobBoard.save(function(err){
             if (err) return handleError(err);
          })
        })
      })
    }});
})

module.exports = router;
