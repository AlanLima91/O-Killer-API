const { Mission } = require('../../schema/missions')
const _ = require('lodash')
const { ObjectID } = require('mongodb')

async function postMission (req, res) {
  try {
    var body = _.pick(req.body, ['_id', 'target', 'done', 'action'])
    var mission = new Mission(body)
    await mission.save()

    res.status(200).send(mission)
  } catch (error) {
    res.status(400).send(error)
  }
}

async function getMissions (req, res) {
  try {
    const missions = await Mission.find()

    res.status(200).send({ missions })
  } catch (error) {
    res.status(400).send(error)
  }
}

async function getMission (req, res) {
  try {
    var id = req.params.id
    if (!ObjectID.isValid(id)) return res.status(404).send()

    const mission = await Mission.findById(id)
    if (!mission) return res.status(404).send()

    res.status(200).send({ mission })
  } catch (error) {
    res.status(400).send(error)
  }
}

async function patchMission (req, res) {
  try {
    var id = req.params.id
    var body = _.pick(req.body, ['_id', 'target', 'done', 'action'])

    if (!ObjectID.isValid(id)) return res.status(400).send()
    const mission = await Mission.findByIdAndUpdate(id, { $set: body }, { new: true })

    if (!mission) return res.status(404).send()
    res.status(200).send({ mission })
  } catch (error) {
    res.status(400).send(error)
  }
}

async function deleteMission (req, res) {
  try {
    var id = req.params.id
    if (!ObjectID.isValid(id)) return res.status(404).send()

    const mission = await Mission.findByIdAndDelete(id)
    if (!mission) return res.status(404).send()

    res.status(200).send({ mission })
  } catch (error) {
    res.status(400).send(error)
  }
}

exports.postMission = postMission
exports.getMissions = getMissions
exports.getMission = getMission
exports.patchMission = patchMission
exports.deleteMission = deleteMission
