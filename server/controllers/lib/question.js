const { Question } = require('../../schema/questions')
const _ = require('lodash')
const { ObjectID } = require('mongodb')

async function getQuestions (req, res) {
  try {
    const questions = await Question.find()
    res.status(200).send({ questions })
  } catch (error) {
    res.status(400).send(error)
  }
}

async function postQuestion (req, res) {
  try {
    var body = _.pick(req.body, ['value', 'tags', 'answer'])
    var questions = new Question(body)

    await questions.save()
    res.status(201).send(questions)
  } catch (error) {
    res.status(400).send(error)
  }
}

async function deleteQuestion (req, res) {
  try {
    var id = req.params.id
    if (!ObjectID.isValid(id)) return res.status(404).send()

    const question = await Question.findByIdAndDelete(id)
    if (!question) return res.status(404).send()

    res.status(204).send({ question })
  } catch (error) {
    res.status(400).send(error)
  }
}

async function getQuestion (req, res) {
  try {
    var id = req.params.id
    if (!ObjectID.isValid(id)) return res.status(404).send()

    const question = await Question.findById(id)
    if (!question) return res.status(404).send()

    res.status(200).send({ question })
  } catch (error) {
    res.status(400).send(error)
  }
}

async function patchQuestion (req, res) {
  try {
    var id = req.params.id
    var body = _.pick(req.body, ['value', 'tags', 'answer'])
    if (!ObjectID.isValid(id)) return res.status(400).send()

    const question = await Question.findByIdAndUpdate(id, { $set: body }, { new: true })
    if (!question) return res.status(404).send()

    res.status(200).send({ question })
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.getQuestions = getQuestions
exports.postQuestion = postQuestion
exports.deleteQuestion = deleteQuestion
exports.getQuestion = getQuestion
exports.patchQuestion = patchQuestion
