const mongoose  = require('mongoose');
const _         = require('lodash');

var TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    }
})

TagSchema.methods.toJSON = function () {
    var tag = this;
    var tagObject = tag.toObject();
    return _.pick(tagObject, ['_id', 'name']);
}

var Tag = mongoose.model('Tag', TagSchema);
module.exports = { Tag };