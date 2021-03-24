const { MissionPool } = require('../../schema/missionPool');
const _ = require('lodash');
const { ObjectID } = require('mongodb');

exports.createMissionPool = async (req, res) => {
  try {
    const body = _.pick(req.body, ['name', 'description', 'duration'])
    var missionPool = new MissionPool(body);
    
    await missionPool.save();
    res.status(201).send(missionPool);
  } catch (e) {
    res.status(500).send(error)
  }
}
