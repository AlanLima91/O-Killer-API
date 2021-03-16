const mongoose = require('mongoose')
const _ = require('lodash')

var GameplaySchema = new mongoose.Schema({
  name: {
    type: String
  },
  owner: {

  },
  duration: {
    type: String
  },
  startTime: {
    type: Date
  },
  state: {
    type: String,
    enum: ['started', 'finished', 'pending']
  }
}, { timestamps: true })

// ** Méthodes d'instance **
GameplaySchema.methods.toJSON = function () {
  var gameplay = this
  var gameplayObject = gameplay.toObject()
  return _.pick(gameplayObject, [])
}

var Gameplay = mongoose.model('Gameplay', GameplaySchema)
module.exports = { Gameplay }
