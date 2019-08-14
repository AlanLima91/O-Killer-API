const { Action }   = require('../../schema/actions');
const _            = require('lodash');
const { mongoose } = require('../../db/mongoose');
const { ObjectID } = require('mongodb');

function postAction(req, res)
{
    var body = _.pick(req.body, ['_id', 'todo', 'level', 'tags', 'actionType']);
    var action = new Action(body);

    action.save().then(doc => {
        res.status(200).send(doc);
    }).catch(err => {
        res.status(400).send(err);
    })
}

function getActions(req, res)
{
    Action.find().then(actions => {
        res.status(200).send({actions});
      }).catch(err => {
        res.status(400).send(err);
      })
}

function getAction(req, res)
{
    var id = req.params.id;
    if (!ObjectID.isValid(id))
      return res.status(404).send();
    Action.findById(id).then(action => {
      if (!action)
        return res.status(404).send();
      res.status(200).send({action});
    }).catch(err => {
      res.status(400).send(err);
    })
}

function patchAction(req, res)
{
    var id = req.params.id;
    var body = _.pick(req.body, ['_id', 'todo', 'level', 'tags', 'actionType']);
  
    if (!ObjectID.isValid(id))
      return res.status(400).send();
    Action.findByIdAndUpdate(id, {$set: body}, {new: true}).then(action => {
      
      if (!action) {
        return res.status(404).send();
      }
      res.status(200).send({action});
    }).catch(err => res.status(400).send());
}

function deleteAction(req, res)
{
    var id = req.params.id;
    if (!ObjectID.isValid(id))
      return res.status(404).send();
    Action.findByIdAndDelete(id).then(action => {
      if (!action)
        return res.status(404).send();
      res.status(200).send({action});
    }).catch(err => res.status(400).send());
}

exports.postAction    = postAction;
exports.getActions    = getActions;
exports.getAction     = getAction;
exports.patchAction   = patchAction;
exports.deleteAction  = deleteAction;