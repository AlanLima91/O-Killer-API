const mongoose = require('mongoose')
const _ = require('lodash');

var MissionPoolSchema = new mongoose.Schema({
  name: {
    type: string,
    required: true,
  },
  description: {
    type: string,
    required: true,
  },
  duration: {
    type: string,
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
