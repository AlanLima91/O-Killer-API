const ActionType  = require('../lib/actiontype');

module.exports = function (app) {

    app.post('/actiontype', ActionType.postActionType)

    app.get('/actiontypes', ActionType.getActionTypes)

    app.get('/actiontype/:id', ActionType.getActionType)

    app.patch('/actiontype/:id', ActionType.patchActionType)

    app.delete('/actiontype/:id', ActionType.deleteActionType)
}
