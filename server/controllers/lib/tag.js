const { Tag }     = require('../../schema/tags');
const _            = require('lodash');
const { mongoose } = require('../../db/mongoose');
const { ObjectID } = require('mongodb');

function postTag(req, res) {
    var body = _.pick(req.body, ['name']);
    var tag = new Tag(body);

    tag.save().then(doc => {
        res.status(201).send(doc);
    }).catch(err => {
        res.status(400).send(err);
    })
}

function getTags(req, res) {
    Tag.find().then(tags => {
        res.status(200).send({tags});
    }).catch(err => {
        res.status(400).send(err);
    })
}

function getTag(req, res) {
    var id = req.params.id;
    if (!ObjectID.isValid(id))
        return res.status(404).send();
    Tag.findById(id).then(tag => {
        if (!tag)
            return res.status(404).send();
        res.status(200).send({ tag })
    }).catch(err => {
        res.status(400).send(err);
    })
}

function patchTag(req, res) {
    var id = req.params.id;

    var body = _.pick(req.body, ['name']);
  
    if (!ObjectID.isValid(id))
      return res.status(400).send();
    Tag.findByIdAndUpdate(id, {$set: body}, {new: true}).then(tag => {
      
      if (!tag) {
        return res.status(404).send();
      }
      res.status(200).send({tag});
    }).catch(err => res.status(400).send());
}

function deleteTag(req, res) {

    var id = req.params.id;

    if (!ObjectID.isValid(id))
      return res.status(404).send();
    Tag.findByIdAndDelete(id).then(tag => {
      if (!tag)
        return res.status(404).send();
      res.status(204).send({tag});
    }).catch(err => res.status(400).send());
}

exports.postTag     = postTag;
exports.getTags     = getTags;
exports.getTag      = getTag;
exports.patchTag    = patchTag;
exports.deleteTag   = deleteTag;