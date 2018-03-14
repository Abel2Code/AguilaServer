//schema for organization
const mongoose = require('mongoose');

let OrganizationSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    pricePlan: {
        type: String,
        required: true
    },
    students: {
        type: [User],
        required: false
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false
    }
})

const Organization = module.exports = mongoose.model('Organization', OrganizationSchema);
