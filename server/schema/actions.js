const mongoose = require('mongoose');

var Actions = mongoose.model('Action', {
    todo: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 30,
        trim: true
    },
    level: {
        type: Number,
        required: true
    },
    tags:[
        {
            name: String
        }
    ],
    actionType:{
        type: String,
        required: true,
    }
});

module.exports = { Actions }