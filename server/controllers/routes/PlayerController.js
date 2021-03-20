const Player = require('../lib/player')
const authentificate = require('../../middlewares/authentificate');

module.exports = function (app) {
  app.get('/players', authentificate, Player.getAllGamePlay)

  
}
