const mongoose = require('mongoose')
const _ = require('lodash')

var Schema = mongoose.Schema

var QuestionSchema = new Schema([
  {
    value: String,
    tags: {
      type: [String]
    },
    answer: {
      type: [String]
    }
  }
])

// ** Méthodes d'instance **
QuestionSchema.methods.toJSON = function () {
  var question = this
  var questionObject = question.toObject()
  return _.pick(questionObject, ['_id', 'value', 'tags', 'answer'])
}

var Question = mongoose.model('Question', QuestionSchema)
module.exports = { Question }
