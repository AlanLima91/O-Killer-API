const mongoose = require('mongoose')
const _ = require('lodash')

var GameplaySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  duration: {
    type: String
  },
  keyJoined: {
    type: String,
    unique:true,
    index:true
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
