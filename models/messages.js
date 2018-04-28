//schema for messages
const mongoose = require('mongoose');

let MessagesSchema = mongoose.Schema({
    newNotifications:{
        type: Number,
        required: false
    },
    messages:{
        type: [{
            users: [],
            conversation: [{
                timeStamp: String,
                message: String,
                readStatus: Boolean
            }]
        }],
        required: false
    },
});

const Messages = module.exports = mongoose.model('Messages', MessagesSchema);
