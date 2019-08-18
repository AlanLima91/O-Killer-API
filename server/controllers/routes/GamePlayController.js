const GamePlay  = require('../lib/gameplay');

module.exports = function (app) {
	
	app.get('/gameplays', GamePlay.getAllGamePlay);

	app.get('/gameplay/:id', GamePlay.getGamePlay);

	app.post('/gameplay',GamePlay.create);

	app.delete('/gameplay/clear',GamePlay.deleteAllGamePlay);

	app.delete('/gameplay/:id', GamePlay.deleteGamePlay);

	app.patch('/gameplay/:id', GamePlay.patchGamePlay);
}