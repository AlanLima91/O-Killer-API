const { Gameplay } = require('../../schema/gameplay');
const _ = require('lodash');
const { ObjectID } = require('mongodb');
const User = require('./user');

function getGameplays(req, res) {
  Gameplay.find().then(gameplay => {
    res.status(200).send({ gameplay });
  }).catch(err => {
    res.status(400).send(err);
  });
}

function postGameplay(req, res) {
  var body = _.pick(req.body, ['name', 'duree', 'level', 'startTime', 'gamers']);

  let promise = getListNewUserId(req.body["nbJoueur"]);
  promise.then(data => {
    body.gamers = data;
    body.startTime = Date.now();
    var gameplay = new Gameplay(body);

    gameplay.save().then(content => {
      res.status(201).send(content);
    }).catch(err => {
      res.status(400).send(err);
    })
  });
}

function getListNewUserId(nbJoueur) {
  return new Promise((resolve, reject) => {
    let gamers = [];
    let y = 0;
    for (var i = 0; i < nbJoueur; i++) {
      // Concat string and var with ${}
      User.signUp({ username: `joueur${i}` }).then(id => {
        gamers[y] = id;
        y++;
        if (y == nbJoueur) {
          resolve(gamers);
        }
      });
    }
  })
}

function deleteGameplay(req, res) {
  var id = req.params.id;
  if (!ObjectID.isValid(id))
    return res.status(404).send();
  Gameplay.findByIdAndDelete(id).then(gameplay => {
    if (!gameplay)
      return res.status(404).send();
    res.status(204).send({ gameplay });
  }).catch(err => res.status(400).send());
}

function deleteAllGameplay(req, res) {
  Gameplay.deleteMany({}).then(gameplay => {
    if (!gameplay)
      return res.status(404).send();
    res.status(204).send({ gameplay });
  }).catch(err => res.status(400).send());
}

function getGameplay(req, res) {
  var id = req.params.id;
  if (!ObjectID.isValid(id))
    return res.status(404).send();
  Gameplay.findById(id).then(gameplay => {
    if (!gameplay){
      return res.status(404).send();
    }
    res.status(200).send({ gameplay });
  }).catch(err => {
    res.status(400).send(err);
  })
}

function patchGameplay(req, res) {
  var id = req.params.id;
  var body = _.pick(req.body, ['name', 'duree', 'level', 'gamers']);

  if (!ObjectID.isValid(id))
    return res.status(400).send();
  Gameplay.findByIdAndUpdate(id, { $set: body }, { new: true }).then(gameplay => {

    if (!gameplay) {
      return res.status(404).send();
    }
    res.status(200).send({ gameplay });
  }).catch(err => res.status(400).send());
}

function getGamers(req, res) {
  var id = req.params.id;
  if (!ObjectID.isValid(id))
    return res.status(400).send();
  Gameplay.findById(id).then(gameplay => {
    if (!gameplay) {
      return res.status(404).send();
    }
    gameplay = gameplay.gamers
    res.status(200).send({ gameplay });
  }).catch(err => {
    res.status(400).send(err);
  });
}

exports.getGameplays = getGameplays;
exports.getGameplay = getGameplay;
exports.getGamers = getGamers
exports.postGameplay = postGameplay;
exports.deleteGameplay = deleteGameplay;
exports.patchGameplay = patchGameplay;
exports.deleteAllGameplay = deleteAllGameplay;