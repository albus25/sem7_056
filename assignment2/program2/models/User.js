const mongoose = require('mongoose')

const schema = mongoose.Schema({
    name: {
        type: String

    },
    email: {
        type: String
     
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now
    } 
})

const User = mongoose.model('User', schema)

module.exports = User