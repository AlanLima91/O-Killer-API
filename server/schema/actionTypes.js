const mongoose = require('mongoose');

var ActionTypes = mongoose.model('ActionType', {
    name: String
});

module.exports = { ActionTypes }