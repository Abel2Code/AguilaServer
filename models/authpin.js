//schema for contacts
const mongoose = require('mongoose');

let AuthPinSchema = mongoose.Schema({
 email:{
    type: String,
    required: true
  },
  pin:{
    type: String,
    required: true
  },
  expireAt: {
    type: Date, 
    default: new Date().setHours(new Date().getHours() + 1), 
    expiresAfterSeconds: 10, 
    expires: 10
  }

});

AuthPinSchema.index({ expireAt: 3600 });

const AuthPin = module.exports = mongoose.model('AuthPin', AuthPinSchema);
