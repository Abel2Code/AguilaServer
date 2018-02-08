//schema for School
const mongoose = require('mongoose');

const CollegeSchema = mongoose.Schema({
    collegeName:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    }
})

const College = module.exports = mongoose.model('College', CollegeSchema);