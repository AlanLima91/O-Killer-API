const Gameplay = require('../lib/gameplay')

module.exports = function (app) {
  app.get('/gameplays', Gameplay.getAll)

  app.get('/gameplays/:id', Gameplay.getOne)

  app.post('/gameplays', Gameplay.post)

  app.delete('/gameplays/:id', Gameplay.delete)

  app.patch('/gameplays/:id', Gameplay.patch)
}
