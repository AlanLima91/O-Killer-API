const { ActionTypes }     = require('../../schema/actiontypes');
const _            = require('lodash');
const { ObjectID } = require('mongodb');


function getAllActionTypes(req,res){
   ActionTypes.find().then(actiontype => {
      res.status(200).send({actiontype});
   }).catch(err => {
      res.status(400).send(err);
   });
}

function create(req,res){
	var body = _.pick(req.body, ['value', 'tags', 'answer']);
	body.startTime = Date.now();
   var actiontypes = new ActionTypes(body);

   actiontypes.save().then(actiontype => {
      res.status(201).send(actiontype);
   }).catch(err => {
      res.status(400).send(err);
   })
}

function deleteActionType(req, res)
{
   var id = req.params.id;
   if (!ObjectID.isValid(id))
      return res.status(404).send();
   ActionTypes.findByIdAndDelete(id).then(actiontype => {
      if (!actiontype)
         return res.status(404).send();
      res.status(204).send({actiontype});
   }).catch(err => res.status(400).send());
}


function getActionType(req,res) {
   var id = req.params.id;
   if (!ObjectID.isValid(id))
      return res.status(404).send();
   ActionTypes.findById(id).then(actiontype => {
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
   var body = _.pick(req.body, ['value', 'tags', 'answer']);
  
   if (!ObjectID.isValid(id))
      return res.status(400).send();
   ActionTypes.findByIdAndUpdate(id, {$set: body}, {new: true}).then(question => {
      
      if (!question) {
        return res.status(404).send();
      }
      res.status(200).send({question});
   }).catch(err => res.status(400).send());
}

exports.getAllActionTypes = getAllActionTypes;
exports.create = create;
exports.deleteActionType = deleteActionType;
exports.getActionType = getActionType;
exports.patchActionType = patchActionType;