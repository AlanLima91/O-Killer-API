const { Questions }     = require('../../schema/questions');
const _            = require('lodash');
const { ObjectID } = require('mongodb');


function getAllQuestion(req,res){
   Questions.find().then(question => {
      res.status(200).send({question});
   }).catch(err => {
      res.status(400).send(err);
   });
}

function create(req,res){
	var body = _.pick(req.body, ['value', 'tags', 'answer']);
	body.startTime = Date.now();
   var questions = new Questions(body);

   questions.save().then(question => {
      res.status(201).send(question);
   }).catch(err => {
      res.status(400).send(err);
   })
}

function deleteQuestion(req, res)
{
   var id = req.params.id;
   if (!ObjectID.isValid(id))
      return res.status(404).send();
   Questions.findByIdAndDelete(id).then(question => {
      if (!question)
         return res.status(404).send();
      res.status(204).send({question});
   }).catch(err => res.status(400).send());
}


function getQuestion(req,res) {
   var id = req.params.id;
   if (!ObjectID.isValid(id))
      return res.status(404).send();
   Questions.findById(id).then(question => {
      if (!question)
         return res.status(404).send();
      res.status(200).send({question});
   }).catch(err => {
      res.status(400).send(err);
   })
}

function patchQuestion(req, res)
{
   var id = req.params.id;
   var body = _.pick(req.body, ['value', 'tags', 'answer']);
  
   if (!ObjectID.isValid(id))
      return res.status(400).send();
   Questions.findByIdAndUpdate(id, {$set: body}, {new: true}).then(question => {
      
      if (!question) {
        return res.status(404).send();
      }
      res.status(200).send({question});
   }).catch(err => res.status(400).send());
}

exports.getAllQuestion = getAllQuestion;
exports.create = create;
exports.deleteQuestion = deleteQuestion;
exports.getQuestion = getQuestion;
exports.patchQuestion = patchQuestion;