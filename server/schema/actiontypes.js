const mongoose = require('mongoose')
const _ = require('lodash')

var ActionTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  }
})

ActionTypeSchema.methods.toJSON = function () {
  var actionType = this
  var actionTypeObject = actionType.toObject()
  return _.pick(actionTypeObject, ['_id', 'name'])
}

var ActionType = mongoose.model('ActionType', ActionTypeSchema)
module.exports = { ActionType }
