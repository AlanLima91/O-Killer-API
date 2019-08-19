const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GamePlaySchema = new Schema([
    {
        duree: {
            value:Number,
            typeDuree:String,
        },
        startTime:Date,
        level:Number,
        gamers:[
            {
                key:String
            }
        ]
    }
]);

var Gameplay = mongoose.model("GamePlay",GamePlaySchema);
module.exports = {Gameplay};