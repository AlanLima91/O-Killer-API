const mongoose = require('mongoose');

var ActionTypeSchema = new mongoose.Schema({
    name: String
});

var ActionTypes = mongoose.model('ActionType', ActionTypeSchema)
module.exports = { ActionTypes }