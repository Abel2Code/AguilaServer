//schema for major
const mongoose = require('mongoose');

const MajorSchema = mongoose.Schema({
    major:{
        type: String,
        required: true
    },
    //School within universtiy for example school of computer science
    school:{
        type: String,
        required: true
    }
})

const Major = module.exports = mongoose.model('Major', MajorSchema);