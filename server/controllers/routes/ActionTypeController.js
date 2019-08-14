const ActionType  = require('../lib/actiontype');

module.exports = function (app) {

    app.post('/actiontype', ActionType.create)

    app.get('/actiontype', ActionType.getAllActionTypes)

    app.get('/actiontype/:id', ActionType.getActionType)

    app.patch('/actiontype/:id', ActionType.patchActionType)

    app.delete('/actiontype/:id', ActionType.deleteActionType)
}
