const mongoose = require('mongoose')

var MissionSchema = new mongoose.Schema({
  gameplayId: {

  },
  userId: {

  },
  playerState: {
    type: String,
    enum: ['alive', 'dead']
  }
}, { timestamps: true })

var Mission = mongoose.model('Mission', MissionSchema)
module.exports = { Mission }
