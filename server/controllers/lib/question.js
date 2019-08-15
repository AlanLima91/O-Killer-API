const { Question } = require('../../schema/questions');
const _            = require('lodash');
const { ObjectID } = require('mongodb');


function getQuestions(req,res) {
   Question.find().then(questions => {
      res.status(200).send({ questions });
   }).catch(err => {
      res.status(400).send(err);
   });
}

function postQuestion(req,res){
	var body = _.pick(req.body, ['value', 'tags', 'answer']);
   var questions = new Question(body);

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
   Question.findByIdAndDelete(id).then(question => {
      if (!question)
         return res.status(404).send();
      res.status(204).send({question});
   }).catch(err => res.status(400).send());
}


function getQuestion(req,res) {
   var id = req.params.id;

   if (!ObjectID.isValid(id))
      return res.status(404).send();

   Question.findById(id).then(question => {
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

   Question.findByIdAndUpdate(id, {$set: body}, {new: true}).then(question => {
      
      if (!question) {
        return res.status(404).send();
      }
      res.status(200).send({question});
   }).catch(err => res.status(400).send());
}

exports.getQuestions = getQuestions;
exports.postQuestion = postQuestion;
exports.deleteQuestion = deleteQuestion;
exports.getQuestion = getQuestion;
exports.patchQuestion = patchQuestion;