const Tag = require('../lib/tag')

module.exports = function (app) {
  app.post('/tag', Tag.postTag)

  app.get('/tag/all', Tag.getTags)

  app.get('/tag/:id', Tag.getTag)

  app.patch('/tag/:id', Tag.patchTag)

  app.delete('/tag/:id', Tag.deleteTag)
}
