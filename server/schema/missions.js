const mongoose = require('mongoose');

var MissionSchema = new mongoose.Schema({
    target: {
        type: String,
        trim: true
    },
    done: {
        type: Boolean,
        default: false
    },
    action: {
        type: String,
        minLength: 1,
        maxLength: 15,
        trim: true
    }
});

var Mission = mongoose.model('Mission', MissionSchema);
module.exports = { Mission }