const mongoose = require('mongoose');

var ActionSchema = new mongoose.Schema({
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
    }
});

var Action = mongoose.model('Action', ActionSchema);
module.exports = { Action }