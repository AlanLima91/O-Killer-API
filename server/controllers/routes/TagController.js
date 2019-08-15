const Tag  = require('../lib/tag');

module.exports = function (app) {

    app.post('/tag', Tag.create)

    app.get('/tags', Tag.getAllTag)

    app.get('/tag/:id', Tag.getTag)

    app.patch('/tag/:id', Tag.patchTag)

    app.delete('/tag/:id', Tag.deleteTag)
}