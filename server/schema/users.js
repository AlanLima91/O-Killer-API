const mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
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

var Users = mongoose.model('User', UserSchema);
module.exports = { Users }