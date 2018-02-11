//schema for contacts
const mongoose = require('mongoose');

var AuthPinSchema = mongoose.Schema({
 email:{
    type: String,
    required: true
  },
  pin:{
    type: String,
    required: true
  },
  expireAt: {type: Date, default: 1}

});

AuthPinSchema.index({ expireAfterSeconds: 86400 });

const AuthPin = module.exports = mongoose.model('AuthPin', AuthPinSchema);
