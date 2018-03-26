//schema for users
const mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    school: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    classStanding: {
        type: String,
        required: true
    },
    shareInfo: {
        type: Boolean,
        required: true
    },
    displayName: {
        type: String,
        required: false
    },
    mentorStatus: {
        type: String,
        required: false
    },
    ghostPoints: {
        type: Number,
        required: false
    },
    accumulatedPoints: {
        type: Number,
        required: false
    },
    currentPoints: {
        type: Number,
        required: false
    },
    blockedStatus: {
        type: Boolean,
        required: false
    },
    log: {
        type: [{
            type: String,
            description: String,
            timeStamp: String,
            quantity: Number,
        }],
        required: false
    }
});

const User = module.exports = mongoose.model('User', UserSchema);
