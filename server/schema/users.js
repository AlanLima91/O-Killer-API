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
    },
    password: {
        type: String,
        minLength: 50,
        maxLength: 50,
        trim: true
    },
    tags : [
        {
            name: String
        }
    ]
})

// ** Méthodes d'instance **
// UserSchema.methods.toJSON = function () {
//     var user = this;
//     var userObject = user.toObject();
//     return _.pick(userObject, ['_id','username', 'alive', 'password', 'tags']);
// }

var User = mongoose.model('User', UserSchema);
module.exports = { User }