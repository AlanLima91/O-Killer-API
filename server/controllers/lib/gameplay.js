const { Gameplay } = require('../../schema/gameplay')
const _ = require('lodash')
const { ObjectID } = require('mongodb')
const { getUserBearer } = require('../../utils')

/**
 * The goal here would be to retrieve all the gameplays with the current user in it.
 * To do so, use the token retrieve the _id of the user in the gameplays.
 * @param {*} req
 * @param {*} res
 */
async function getGameplays (req, res) {
  // Retrieve Id from token
  const _id = getUserBearer(req).id
  try {
    // Search a gameplay for this User
    Gameplay.find({ gamers: { $elemMatch: { $eq: _id } } }).then(gameplay => {
      if (gameplay.length <= 0) {
        // No gameplay for this user
        return res.status(404).send({ message: 'No resultat found' })
      }
      // return all the gameplay for this user
      return res.status(200).send(gameplay)
    }).catch(e => {
      console.log(e)
      res.status(400).send({ message: 'Oops something went wrong' })
    })
  } catch (error) {
    console.log(error)
    res.status(400).send({ message: 'Oops something went wrong' })
  }
}

async function postGameplay (req, res) {
  // const _id = getUserBearer(req).id
  try {
    // we construct the body of the gameplay
    const body = _.pick(req.body, ['name', 'duree', 'level', 'startTime', 'gamers'])
    // body.gamers = [_id]
    body.status = 1
    const gameplay = new Gameplay(body)
    gameplay.save().then(gameplay, () => {
      res.status(201).send(gameplay)
    }).catch(e => {
      console.log(e)
      res.status(500).send({ message: 'Oops something went wrong' })
    })
  } catch (e) {
    console.log(e)
    res.status(500).send({ message: 'Oops something went wrong' })
  }
}

async function deleteGameplay (req, res) {
  try {
    const id = req.params.id
    if (!ObjectID.isValid(id)) {
      return res.status(404).send()
    }
    Gameplay.findByIdAndDelete(id).then(gameplay => {
      if (!gameplay) {
        return res.status(404).send()
      }
      res.status(204).send(gameplay)
    }).catch(e => {
      console.log(e)
      res.status(500).send({ message: 'Oops something went wrong' })
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Oops something went wrong' })
  }
}

async function getGameplay (req, res) {
  try {
    var id = req.params.id
    if (!ObjectID.isValid(id)) {
      return res.status(404).send()
    }

    Gameplay.findById(id).then(gameplay => {
      if (!gameplay) {
        return res.status(404).send()
      }
      res.status(200).send({ gameplay })
    }).catch(e => {
      console.log(e)
      res.status(500).send({ message: 'Oops something went wrong' })
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Oops something went wrong' })
  }
}

async function patchGameplay (req, res) {
  try {
    const id = req.params.id
    const body = _.pick(req.body, ['name', 'duree', 'level', 'gamers'])

    if (!ObjectID.isValid(id)) {
      return res.status(400).send()
    }

    Gameplay.findByIdAndUpdate(id, { $set: body }, { new: true }).then(gameplay => {
      if (!gameplay) {
        return res.status(404).send()
      }
      res.status(200).send(gameplay)
    }).catch(e => {
      console.log(e)
      res.status(500).send({ message: 'Oops something went wrong' })
    })
  } catch (error) {
    console.log(error)
    res.status(500).send({ message: 'Oops something went wrong' })
  }
}

exports.getGameplays = getGameplays
exports.getGameplay = getGameplay
exports.postGameplay = postGameplay
exports.deleteGameplay = deleteGameplay
exports.patchGameplay = patchGameplay
