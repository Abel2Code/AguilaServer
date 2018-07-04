const express = require('express');
const router = express.Router();

const Messages = require('../models/messages');
const JobBoard = require('../models/jobBoard')

router.get('/job', function(req, res) {
  Messages.find({
    users: {
      "$in": [req.body.initiatorId]
    }
  }, function(err, messages) {
    if (err) {
      res.send(err);
      return;
    } else {
      res.send(messages);
    }
  });
})

router.put('/sendMessage', function(req, res) {
  JobBoard.findOne({_id: req.body.job}, function(err, jobBoard){
    if(err){
      res.send(err);
      return;
    }
    let isMentor = true;
    if(req.body.userId === jobBoard.author){
      isMentor = false;
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

module.exports = router;
