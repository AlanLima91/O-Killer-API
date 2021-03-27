const mongoose = require('mongoose')
const _ = require('lodash');

var MissionPoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    enum: ['minutes', 'hours', 'days', 'weeks']
  }
}, { timestamps: true });


// ** Méthodes d'instance **
MissionPoolSchema.methods.toJSON = function () {
  var missionPool = this
  var missionPoolObject = player.toObject()
  return _.pick(missionPool, ["_id", "description", "duration"]);
}

var MissionPool = mongoose.model('MissionPool', MissionPoolSchema);
module.exports = { MissionPool }
