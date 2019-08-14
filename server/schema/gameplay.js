const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GamePlaySchema = new Schema([
{
	name:String,
    duree:{value:Number,typeDuree:String},
    startTime:Date,
    level:Number,
    gamers:[{key:String}]
}
]);

var GamePlay = mongoose.model("GamePlay",GamePlaySchema);
module.exports = {GamePlay};