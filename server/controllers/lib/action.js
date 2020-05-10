const { Action } = require('../../schema/actions')
const _ = require('lodash')
const { ObjectID } = require('mongodb')

async function postAction (req, res) {
  try {
    var body = _.pick(req.body, ['_id', 'todo', 'level', 'tags', 'actionType'])
    var action = new Action(body)

    await action.save()

    res.status(200).send({ action })
  } catch (error) {
    res.status(400).send(error)
  }
}

async function getActions (req, res) {
  try {
    const actions = await Action.find()

    res.status(200).send({ actions })
  } catch (error) {
    res.status(400).send(error)
  }
}

async function getAction (req, res) {
  try {
    var id = req.params.id

    if (!ObjectID.isValid(id)) return res.status(404).send()

    const action = await Action.findById(id)

    if (!action) return res.status(404).send()

    res.status(200).send({ action })
  } catch (error) {
    res.status(400).send(error)
  }
}

async function patchAction (req, res) {
  try {
    var id = req.params.id
    var body = _.pick(req.body, ['_id', 'todo', 'level', 'tags', 'actionType'])

    if (!ObjectID.isValid(id)) return res.status(400).send()
    const action = await Action.findByIdAndUpdate(id, { $set: body }, { new: true })

    if (!action) return res.status(404).send()
    res.status(200).send({ action })
  } catch (error) {
    res.status(400).send(error)
  }
}

async function deleteAction (req, res) {
  try {
    var id = req.params.id
    if (!ObjectID.isValid(id)) { return res.status(404).send() }
    Action.findByIdAndDelete(id).then(action => {
      if (!action) { return res.status(404).send() }
      res.status(200).send({ action })
    }).catch(e => {
      console.log(e)
      res.status(400).send()
    })
  } catch (error) {
    console.log(error)
    res.status(400).send(error)
  }
}

exports.postAction = postAction
exports.getActions = getActions
exports.getAction = getAction
exports.patchAction = patchAction
exports.deleteAction = deleteAction
