const { Mission }     = require('../../schema/missions');
const _            = require('lodash');
const { mongoose } = require('../../db/mongoose');
const { ObjectID } = require('mongodb');

function postMission(req, res)
{
    var body = _.pick(req.body, ['_id', 'target', 'done', 'action']);
    var mission = new Mission(body);

    mission.save().then(doc => {
        res.status(200).send(doc);
    }).catch(err => {
        res.status(400).send(err);
    })
}

function getMissions(req, res)
{
    Mission.find().then(missions => {
        res.status(200).send({missions});
      }).catch(err => {
        res.status(400).send(err);
      })
}

function getMission(req, res)
{
    var id = req.params.id;
    if (!ObjectID.isValid(id))
      return res.status(404).send();
    Mission.findById(id).then(mission => {
      if (!mission)
        return res.status(404).send();
      res.status(200).send({mission});
    }).catch(err => {
      res.status(400).send(err);
    })
}

function patchMission(req, res)
{
    var id = req.params.id;
    var body = _.pick(req.body, ['_id', 'target', 'done', 'action']);
  
    if (!ObjectID.isValid(id))
      return res.status(400).send();
    Mission.findByIdAndUpdate(id, {$set: body}, {new: true}).then(mission => {
      
      if (!mission) {
        return res.status(404).send();
      }
      res.status(200).send({mission});
    }).catch(err => res.status(400).send());
}

function deleteMission(req, res)
{
    var id = req.params.id;
    if (!ObjectID.isValid(id))
      return res.status(404).send();
    Mission.findByIdAndDelete(id).then(mission => {
      if (!mission)
        return res.status(404).send();
      res.status(200).send({mission});
    }).catch(err => res.status(400).send());
}

exports.postMission    = postMission;
exports.getMissions    = getMissions;
exports.getMission     = getMission;
exports.patchMission   = patchMission;
exports.deleteMission  = deleteMission;