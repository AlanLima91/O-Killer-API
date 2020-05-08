const { Tag }     = require('../../schema/tags');
const _            = require('lodash');
const { mongoose } = require('../../db/mongoose');
const { ObjectID } = require('mongodb');

async function postTag(req, res) {
    try {
        var body = _.pick(req.body, ['name']);
        var tag = new Tag(body);
        await tag.save();
        res.status(201).send(tag);
    } catch (error) {
        res.status(400).send(error);
    }
}

async function getTags(req, res) {
    try {
        const tags = await Tag.find();
        res.status(200).send({tags});
    } catch (error) {
        res.status(400).send(error);
    }
}

async function getTag(req, res) {
    try {
        var id = req.params.id;
        if (!ObjectID.isValid(id)) return res.status(404).send();

        const tag = await Tag.findById(id);
        if (!tag) return res.status(404).send();

        res.status(200).send({ tag })
    } catch (error) {
        res.status(400).send(error);
    }
}

async function patchTag(req, res) {
    try {
        var id = req.params.id;
        var body = _.pick(req.body, ['name']);
        if (!ObjectID.isValid(id)) return res.status(400).send();

        const tag  = await Tag.findByIdAndUpdate(id, {$set: body}, {new: true});
        if (!tag) return res.status(404).send();

        res.status(200).send({tag});
    } catch (error) {
        res.status(400).send(error);
    }
}

async function deleteTag(req, res) {
    try {
        var id = req.params.id;
        if (!ObjectID.isValid(id)) return res.status(404).send();

        const tag = await Tag.findByIdAndDelete(id);
        if (!tag) return res.status(404).send();

        res.status(204).send({tag});
    } catch (error) {
        res.status(400).send(error);
    }
}

exports.postTag     = postTag;
exports.getTags     = getTags;
exports.getTag      = getTag;
exports.patchTag    = patchTag;
exports.deleteTag   = deleteTag;