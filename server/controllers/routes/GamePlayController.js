const Gameplay = require('../lib/gameplay')

module.exports = function (app) {
  app.get('/gameplays', Gameplay.getGameplays)

  app.get('/gameplays/:id', Gameplay.getGameplay)

  app.post('/gameplays', Gameplay.postGameplay)

  app.delete('/gameplays/:id', Gameplay.deleteGameplay)

  app.patch('/gameplays/:id', Gameplay.patchGameplay)
}
