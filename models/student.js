//schema for contacts
const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
  email:{
    type: String,
    required: true
  },
  phoneNumber:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  firstName:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  profilePhotoLink:{
    type: String,
    required: true
  },
  school:{
    type: String,
    required: true
  },
  classStanding:{
    type: String,
    required: true
  },
  majors:{
    type: [String],
    required: true
  },
  minors:{
    type: [String],
    required: false
  },
});

const Student = module.exports = mongoose.model('Student', StudentSchema);