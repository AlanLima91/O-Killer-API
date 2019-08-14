const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ActionTypeSchema = new Schema([
{
    name:String
}
]);

var ActionType = mongoose.model("ActionType",ActionTypeSchema);
module.exports = {ActionType};