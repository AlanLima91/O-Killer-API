const MissionPool = require('../lib/missionPool');
const authentificate = require('../../middlewares/authentificate');

module.exports = function (app) {
  app.post('/mission_pools', authentificate, MissionPool.createMissionPool);
}