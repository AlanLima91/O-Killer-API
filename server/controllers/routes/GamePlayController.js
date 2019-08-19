const Gameplay  = require('../lib/gameplay');

module.exports = function (app) {
	
	app.get('/gameplays', Gameplay.getGameplays);

	app.get('/gameplay/:id', Gameplay.getGameplay);

	app.post('/gameplay',Gameplay.postGameplay);

	app.delete('/gameplay/clear',Gameplay.deleteAllGameplay);

	app.delete('/gameplay/:id', Gameplay.deleteGameplay);

	app.patch('/gameplay/:id', Gameplay.patchGameplay);
}