//schema for contacts
const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
 birth_day:{
    type: Number,
    required: true
  },
  birth_month:{
    type: Number,
    required: true
  },
  birth_year:{
    type: Number,
    required: true
  },
  bio:{
    type: String,
    required: true
  }, 
  current_school:{
    type: String,
    required: true
  },
  first_name:{
    type: String,
     required: true
  }, 
  last_name:{
    type: String,
    required: true
  },
  major:{
    type: String,
    required: true
  },
  password:{
    type: String,
    required: true
  },
  username:{
    type: String,
    required: false
  }
});

const Student = module.exports = mongoose.model('Student', StudentSchema);