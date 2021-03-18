const mongoose = require('mongoose')

var PlayerSchema = new mongoose.Schema({
  gameplayId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Gameplay'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  playerState: {
    type: String,
    enum: ['alive', 'dead']
  }
}, { timestamps: true })

var Player = mongoose.model('Player', PlayerSchema)
module.exports = { Player }
