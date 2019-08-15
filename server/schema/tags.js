const mongoose  = require('mongoose');

var TagSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5
    }
})

var Tag = mongoose.model('Tag', TagSchema);
module.exports = { Tag };