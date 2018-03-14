//schema for formAnswers
const mongoose = require('mongoose');

let FormAnswersSchema = mongoose.Schema({
    formID:{
        type: String,
        required: true
    },
    userID:{
        type: String,
        required: true
    },
    answers:{
        type: [answer],
        required: true
    },
    timeStamp:{
        type: String,
        required: true
    }
});

const FormAnswers = module.exports = mongoose.model('FormAnswers', FormAnswersSchema);
