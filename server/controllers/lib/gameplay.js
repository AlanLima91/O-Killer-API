const { GamePlay }     = require('../../schema/gameplay');
const _            = require('lodash');
const { ObjectID } = require('mongodb');
const User  = require('./user');

function getAllGamePlay(req,res){
	GamePlay.find().then(gameplay => {
        res.status(200).send({gameplay});
	}).catch(err => {
		res.status(400).send(err);
	});
}

function create(req,res){
	var body = _.pick(req.body, ['name','duree', 'level']);
  
  let promise = getListNewUserId(req.body["nbJoueur"]);
  promise.then(data => {
    body.gamers = data;
    body.startTime = Date.now();
    var gameplay = new GamePlay(body);

    gameplay.save().then(content => {
        res.status(201).send(content);
    }).catch(err => {
        res.status(400).send(err);
    })
  });
}

function getListNewUserId(nbJoueur){
  return new Promise((resolve, reject) => {
    let gamers = [];
    let y=0;
    for (var i = 0; i < nbJoueur; i++) {
      // Concat string and var with ${}
      let id = User.signUp({username:`joueur${i}`,alive:true}).then(id => {
        gamers.push(id);
        y++;
        if (y == nbJoueur) {
          resolve(gamers);
        }
      });
    }
  })
}

function deleteGamePlay(req, res)
{
    var id = req.params.id;
    if (!ObjectID.isValid(id))
      return res.status(404).send();
    GamePlay.findByIdAndDelete(id).then(gameplay => {
      if (!gameplay)
        return res.status(404).send();
      res.status(204).send({gameplay});
    }).catch(err => res.status(400).send());
}

function deleteAllGamePlay(req, res)
{
    GamePlay.deleteMany({}).then(gameplay => {
      if (!gameplay)
        return res.status(404).send();
      res.status(204).send({gameplay});
    }).catch(err => res.status(400).send());
}

function getGamePlay(req,res) {
	var id = req.params.id;
    if (!ObjectID.isValid(id))
      	return res.status(404).send();
    GamePlay.findById(id).then(gameplay => {
		if (!gameplay)
			return res.status(404).send();
		res.status(200).send({gameplay});
    }).catch(err => {
      	res.status(400).send(err);
    })
}

function patchGamePlay(req, res)
{
    var id = req.params.id;
    var body = _.pick(req.body, ['duree', 'level', 'gamers']);
  
    if (!ObjectID.isValid(id))
      	return res.status(400).send();
    GamePlay.findByIdAndUpdate(id, {$set: body}, {new: true}).then(gameplay => {
      
      if (!gameplay) {
        return res.status(404).send();
      }
      res.status(200).send({gameplay});
    }).catch(err => res.status(400).send());
}

exports.getAllGamePlay = getAllGamePlay;
exports.create = create;
exports.deleteGamePlay = deleteGamePlay;
exports.getGamePlay = getGamePlay;
exports.patchGamePlay = patchGamePlay;
exports.deleteAllGamePlay = deleteAllGamePlay;