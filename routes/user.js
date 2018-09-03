const express = require('express');
const router = express.Router();

const User = require('../models/user');

const jwt = require('../services/jwt')

router.get('/user/:key', function(req, res) {
  jwt.verifyToken(req.params.key, (valid) => {
    if (valid) {
      jwt.decodeToken(req.params.key, (err, token) => {
        if (err) {
          res.json(err);
          return;
        }

        User.findOne({ _id: token.id }, function(err, user) {
          if(err) {
            res.json(err);
            return;
          }

          let toSend = JSON.parse(JSON.stringify(user));

          // Parameters we do not want to send
          delete toSend.password;
          delete toSend.log;
          delete toSend._id;
          delete toSend.__v;
          delete toSend.shareInfo;
          delete toSend.mentorStatus;

          res.json(toSend);
        });
      });
    }
  });
});

// Get Mentors
router.get('/user/:id/:key', function(req, res) {
  jwt.verifyToken(req.params.key, (valid) => {
    if (valid) {
      jwt.decodeToken(req.params.key, (err, token) => {
        if (err) {
          res.json(err);
          return;
        }

        User.findOne({ _id: req.params.id }, function(err, user) {
          if(err) {
            res.json(err);
            return;
          }

          if(!user.mentorStatus){
            res.json({
              err: "Invalid Id",
              msg: "Invalid Id"
            })
          }


          let toSend = JSON.parse(JSON.stringify(user));

          // Parameters we do not want to send
          delete toSend.password;
          delete toSend.log;
          delete toSend._id;
          delete toSend.__v;
          delete toSend.shareInfo;
          delete toSend.mentorStatus;

          res.json(toSend);
        });
      });
    }
  });
});

module.exports = router;
