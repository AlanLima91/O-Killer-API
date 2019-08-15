const { ActionType } = require('../../schema/actiontypes');
const _              = require('lodash');
const { ObjectID }   = require('mongodb');


function getActionTypes(req,res){
   ActionType.find().then(actiontype => {
      res.status(200).send({actiontype});
   }).catch(err => {
      res.status(400).send(err);
   });
}

function postActionType(req,res){
	var body = _.pick(req.body, ['name']);
   var actionType = new ActionType(body);

   actionType.save().then(doc => {
      res.status(201).send(doc);
   }).catch(err => {
      res.status(400).send(err);
   })
}

function deleteActionType(req, res)
{
   var id = req.params.id;
   if (!ObjectID.isValid(id))
      return res.status(404).send();
   ActionType.findByIdAndDelete(id).then(actiontype => {
      if (!actiontype)
         return res.status(404).send();
      res.status(204).send({actiontype});
   }).catch(err => res.status(400).send());
}


function getActionType(req,res) {
   var id = req.params.id;
   if (!ObjectID.isValid(id))
      return res.status(404).send();
   ActionType.findById(id).then(actiontype => {
      if (!actiontype)
         return res.status(404).send();
      res.status(200).send({actiontype});
   }).catch(err => {
      res.status(400).send(err);
   })
}

function patchActionType(req, res)
{
   var id = req.params.id;
   var body = _.pick(req.body, ['name']);
  
   if (!ObjectID.isValid(id))
      return res.status(400).send();
   ActionType.findByIdAndUpdate(id, {$set: body}, {new: true}).then(actionType => {
      
      if (!actionType) {
        return res.status(404).send();
      }
      res.status(200).send({actionType});
   }).catch(err => res.status(400).send());
}

exports.getActionTypes     = getActionTypes;
exports.postActionType     = postActionType;
exports.deleteActionType   = deleteActionType;
exports.getActionType      = getActionType;
exports.patchActionType    = patchActionType;