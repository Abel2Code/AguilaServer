//schema for forms
const mongoose = require('mongoose');

let FormSchema = mongoose.Schema({
    createdBy:{
        type: String,
        required: true
    },
    questions:{
        type: [question],
        required: true
    },
    required:{
        type: Boolean,
        required: true
    }
});

const Form = module.exports = mongoose.model('Form', FormSchema);
