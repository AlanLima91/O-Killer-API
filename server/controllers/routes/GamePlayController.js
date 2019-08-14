const GamePlay  = require('../lib/gameplay');

module.exports = function (app) {
	
	app.get('/gameplay/all', GamePlay.getAllGamePlay);

	app.get('/gameplay/:id', GamePlay.getGamePlay);

	app.post('/gameplay',GamePlay.create);

	app.post('/gameplay/:id', GamePlay.deleteGamePlay);

	app.patch('/gameplay/:id', GamePlay.patchGamePlay);
}