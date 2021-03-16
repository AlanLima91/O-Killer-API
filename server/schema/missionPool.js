const mongoose = require('mongoose')

var MissionPoolSchema = new mongoose.Schema({
  description: {

  },
  missionPoolId: {

  },
  duiration: {

  }
}, { timestamps: true })

var Mission = mongoose.model('MissionPool', MissionPoolSchema)
module.exports = { Mission }
