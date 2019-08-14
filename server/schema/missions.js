const mongoose = require('mongoose');

var Missions = mongoose.model('Mission', {
    target: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 15,
        trim: true
    },
    done: {
        type: Boolean,
        required: true,
        default: false
    },
    action: {
        type: String,
        required: true,
        minLength: 1,
        maxLength: 15,
        trim: true
    }
});

module.exports = { Missions }