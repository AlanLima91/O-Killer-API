const mongoose = require('mongoose');
const _         = require('lodash');

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
    tags: {
        type: [String]
    },
    actionType: {
        type: String,
    }
});

ActionSchema.methods.toJSON = function () {
    var action = this;
    var actionObject = action.toObject();
    return _.pick(actionObject, ['_id', 'todo', 'level', 'tags', 'actionTypes'])
}

var Action = mongoose.model('Action', ActionSchema);
module.exports = { Action }