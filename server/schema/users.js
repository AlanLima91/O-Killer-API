const mongoose = require('mongoose');

var User = mongoose.model('User', {
    username: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 15
    },
    alive: {

    },
    password: {
        type: String,
        required: true,
        minLength: 50,
        maxLength: 50
    },
    tags : [
        
    ]
})