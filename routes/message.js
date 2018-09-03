const express = require('express');
const router = express.Router();

const Messages = require('../models/messages');
const JobBoard = require('../models/jobBoard');

const jwt = require('../services/jwt')

const socketExports = require('../global/socketio.js');
const createConversationSocket = socketExports.createConversationSocket;

router.get('/getMessages/:job/:key', function(req, res) {
  jwt.verifyToken(req.params.key, (valid) => {
    if (valid) {
      jwt.decodeToken(req.params.key, (err, token) => {
        if (err) {
          res.json(err);
          return;
        }
        JobBoard.findOne({
          _id: req.params.job
        }, function(err, jobBoard) {
          if (err) {
            res.send(err);
            return;
          }
          createConversationSocket(req.params.job);

          res.send(jobBoard.messages);
        })
      });
    }
  });
});

router.put('/sendMessage/:key', function(req, res) {
  jwt.verifyToken(req.params.key, (valid) => {
    if (valid) {
      jwt.decodeToken(req.params.key, (err, token) => {
        if (err) {
          res.json(err);
          return;
        }
        JobBoard.findOne({
          _id: req.body.job
        }, function(err, jobBoard) {
          if (err) {
            res.send(err);
            return;
          }
          if (!(token.id == jobBoard.author || token.id == jobBoard.mentor)) {
            res.send('Invalid Credentials');
            return;
          }
          let isMentor = true;
          if (token.id == jobBoard.author) {
            isMentor = false;
          }
          
          jobBoard.messages.push({
            isMentor: isMentor,
            message: req.body.message
          })

          jobBoard.save(function(err) {
            if (err) return handleError(err);
            // If Socket was not created, Create interval
            // Send message through Socket.
          })
        })
      })
    }
  });
})

module.exports = router;
