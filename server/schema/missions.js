const mongoose = require('mongoose');

var MissionSchema = new mongoose.Schema({
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

var Mission = mongoose.model('Mission', MissionSchema);
module.exports = { Mission }