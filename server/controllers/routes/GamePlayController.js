const Gameplay = require('../lib/gameplay')
const authentificate = require('../../middlewares/authentificate');

module.exports = function (app) {
  app.get('/gameplays', authentificate, Gameplay.getAll)

  app.put('/gameplays/new', authentificate, Gameplay.createGamePlay)
  
  app.post('/gameplays/joined', authentificate, Gameplay.joinGamePlay)

  app.post('/gameplays/started', authentificate, Gameplay.launchGamePlay)
}
