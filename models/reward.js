//schema for rewards
const mongoose = require('mongoose');

let RewardSchema = mongoose.Schema({
    rewardImage: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

const Reward = module.exports = mongoose.model('Reward', RewardSchema);
