const mongoose = require('mongoose')

var MissionPoolSchema = new mongoose.Schema({
  // description: {

  // },
  // missionPoolId: {

  // },
  // duiration: {

  // }
}, { timestamps: true })

var MissionPool = mongoose.model('MissionPool', MissionPoolSchema)
module.exports = { MissionPool }
