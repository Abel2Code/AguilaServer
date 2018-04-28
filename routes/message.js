const express = require('express');
const router = express.Router();

const Messages = require('../models/messages');

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

module.exports = router;
