//schema for redeemLog
const mongoose = require('mongoose');

let RedeemLogSchema = mongoose.Schema({
    userID: {
        type: String,
        required: true
    },
    rewardName: {
        type: String,
        required: true
    },
    statusDelivered: {
        type: Boolean,
        required: true
    },
    timeStamp: {
        type: String,
        required: true
    }
})

const RedeemLog = module.exports = mongoose.model('RedeemLog', RedeemLogSchema);
