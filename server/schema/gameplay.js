const mongoose  = require('mongoose');
const _         = require('lodash');

var GameplaySchema = new mongoose.Schema({
        name: {
            type: String
        },
        duree: {
            type: String
        },
        startTime: {
            type: Date
        },
        level: {
            type: Number
        },
        gamers: {
            type: [String]
        }
    }
);

// ** Méthodes d'instance **
GameplaySchema.methods.toJSON = function () {
    var gameplay = this;
    var gameplayObject = gameplay.toObject();
    return _.pick(gameplayObject, ['_id', 'name', 'duree', 'startTime', 'level', 'gamers']);
}

var Gameplay = mongoose.model("Gameplay",GameplaySchema);
module.exports = {Gameplay};
