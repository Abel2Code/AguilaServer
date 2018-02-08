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
  createdAt:{
    type: Date,
    expires: 3600000,
  default: 1
 }

});

// AuthPinSchema.index({ createdAt: 1 }, { expireAfterSeconds: 3 });

const AuthPin = module.exports = mongoose.model('AuthPin', AuthPinSchema);
