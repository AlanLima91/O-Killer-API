const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuestionSchema = new Schema([
{
    value:String,
    tags: {
        type:[String]
    },
    answer:{
        type:[String]
    }
}
]);

var Question = mongoose.model("Question",QuestionSchema);
module.exports = {Question};