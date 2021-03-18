const mongoose = require('mongoose')

var MissionSchema = new mongoose.Schema({
  // playerId: {

  // },
  // targetId: {

  // },
  // missionPoolId: {

  // },
  missionState: {
    type: String,
    enum: ['succeed', 'in_progress', 'awaiting_for_validation', 'failed']
  }
}, { timestamps: true })

var Mission = mongoose.model('Missions', MissionSchema)
module.exports = { Mission }
