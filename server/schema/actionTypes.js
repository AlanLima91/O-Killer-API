const mongoose = require('mongoose');

var ActionType = mongoose.model('ActionType', {
    name: String
});

module.exports = { ActionType }