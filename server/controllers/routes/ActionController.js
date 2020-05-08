const Action  = require('../lib/action');

module.exports = function (app) {
    
    // POST /action
    app.post('/action', Action.postAction)

    // GET /actions
    app.get('/action/all', Action.getActions)

    // GET /action/id
    app.get('/action/:id', Action.getAction)

    // PATCH /action/id
    app.patch('/action/:id', Action.patchAction)

    // DELETE /action/id
    app.delete('/action/:id', Action.deleteAction)
}