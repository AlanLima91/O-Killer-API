const { Gameplay } = require('../../schema/gameplay');
const _ = require('lodash');
const { ObjectID } = require('mongodb');
const User = require('./user');

async function getGameplays(req, res) {
    try {
        const gamePlay = await Gameplay.find();
        res.status(200).send({ gamePlay });
    } catch (error) {
        res.status(400).send(error);
    }
}

async function postGameplay(req, res) {
    try {
        var body = _.pick(req.body, ['name', 'duree', 'level', 'startTime', 'gamers']);

        // let promise = getListNewUserId(req.body["nbJoueur"]);
        // let gamers = [];
        // let y = 0;
        

        // body.gamers = data;
        // body.startTime = Date.now();

        // var gameplay = new Gameplay(body);

        // await gameplay.save();
        res.status(201).send(true);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function deleteGameplay(req, res) {
    try {
        var id = req.params.id;
        if (!ObjectID.isValid(id)) return res.status(404).send();

        const gameplay = await Gameplay.findByIdAndDelete(id);
        if (!gameplay) return res.status(404).send();

        res.status(204).send({ gameplay });
    } catch (error) {
        res.status(400).send(error);
    }
}

async function deleteAllGameplay(req, res) {
    try {
        const gameplay = await Gameplay.deleteMany({});
        if (!gameplay) return res.status(404).send();
        res.status(204).send({ gameplay });
    } catch (error) {
        res.status(400).send(error);
    }
}

async function getGameplay(req, res) {
    try {
        var id = req.params.id;
        if (!ObjectID.isValid(id)) return res.status(404).send();
        
        const gameplay = await Gameplay.findById(id);
        if (!gameplay) return res.status(404).send();

        res.status(200).send({ gameplay });
    } catch (error) {
        res.status(400).send(error);
    }
}

async function patchGameplay(req, res) {
    try {
        var id = req.params.id;
        var body = _.pick(req.body, ['name', 'duree', 'level', 'gamers']);
        if (!ObjectID.isValid(id)) return res.status(400).send();

        const gameplay = await Gameplay.findByIdAndUpdate(id, { $set: body }, { new: true });
        if (!gameplay) return res.status(404).send();
        
        res.status(200).send({ gameplay });
    } catch (error) {
        res.status(400).send(error);
    }
}

async function getGamers(req, res) {
    try {
        var id = req.params.id;
        if (!ObjectID.isValid(id)) return res.status(400).send();

        const gameplay = await Gameplay.findById(id);
        if (!gameplay) return res.status(404).send();
        gameplay = gameplay.gamers

        res.status(200).send({ gameplay });
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.getGameplays = getGameplays;
exports.getGameplay = getGameplay;
exports.getGamers = getGamers
exports.postGameplay = postGameplay;
exports.deleteGameplay = deleteGameplay;
exports.patchGameplay = patchGameplay;
exports.deleteAllGameplay = deleteAllGameplay;