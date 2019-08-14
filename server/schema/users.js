const mongoose = require('mongoose');

var User = mongoose.model('User', {
    username: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 15,
        trim: true
    },
    alive: {
        type: Boolean,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 50,
        maxLength: 50,
        trim: true
    },
    tags : [
        {
            name: String
        }
    ]
});

module.exports = { User }