//schema for job board
const mongoose = require('mongoose');

let JobBoardSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: false
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    schoolOnly: {
        type: Boolean,
        required: false
    },
    matchedStatus: {
        type: Boolean,
        required: true
    }
})

const JobBoard = module.exports = mongoose.model('JobBoard', JobBoardSchema);
