//schema for report log
const mongoose = require('mongoose');

let ReportLogSchema = mongoose.Schema({
    reportedBy: {
        type: String,
        required: true
    },
    reportedPerson: {
        type: String,
        required: true
    },
    timeStamp: {
        type: String,
        required: true
    },
    reasonWhy: {
        type: String,
        required: true
    },
    situation: {
        type: {
            location: String,
            description: String,
        },
        required: true
    }
})

const ReportLog = module.exports = mongoose.model('ReportLog', ReportLogSchema);
