const Mission  = require('../lib/mission');

module.exports = function (app) {
    
    // POST /mission
    app.post('/mission', Mission.postMission)

    // GET /missions
    app.get('/mission/all', Mission.getMissions)

    // GET /mission/id
    app.get('/mission/:id', Mission.getMission)

    // PATCH /mission/id
    app.patch('/mission/:id', Mission.patchMission)

    // DELETE /mission/id
    app.delete('/mission/:id', Mission.deleteMission)
}