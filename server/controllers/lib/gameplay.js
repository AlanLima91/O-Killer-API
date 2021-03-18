const { Gameplay } = require('../../schema/gameplay')
const { Player } = require('../../schema/player')
const _ = require('lodash')
const { ObjectID } = require('mongodb')
const { getRandomString } = require('../../utils')

/**
 * The goal here would be to retrieve all the gameplays with the current user in it.
 * To do so, use the token retrieve the _id of the user in the gameplays.
 * @param {*} req
 * @param {*} res
 */
exports.getAll = async (req, res) => {
  // Retrieve Id from token
  const _id = req.user._id

  try {
    if (!_id) {
      return res.status(404).send({ message: 'No resultat found' })
    }

    return res.status(200).send({message:"No Data"})
  } catch (error) {
    console.error(error)
    res.status(400).send({ message: 'Oops something went wrong' })
  }
}

exports.createGamePlay = async (req, res) => {
  const owner = req.user._id
  const {duration, name} = req.body
  try {
    let keyJoined = getRandomString(8).toUpperCase()
    const body = {
      owner,
      state: "pending",
      keyJoined,
      duration,
      name
    };
    const sameName = await Gameplay.countDocuments({name})
    if(sameName) return res.status(500).send({ message: 'Nom de jeu déjà pris.' })
    let sameKey = await Gameplay.countDocuments({keyJoined})
    while(sameKey) {
      keyJoined = getRandomString(8).toUpperCase()
      sameKey = await Gameplay.countDocuments({keyJoined})
    }
    
    const gameplay = new Gameplay(body)
    await gameplay.save()
    const player = new Player({
      userId:owner,
      gameplayId:gameplay._id,
      playerState:'alive'
    })
    await player.save()
    res.status(201).json({keyJoined})
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Oops something went wrong' })
  }
}


exports.joinGamePlay = async (req, res) => {
  const userId = req.user._id
  const { keyJoined } = req.body
  try {
    const gameplay = await Gameplay.findOne({keyJoined})
    if(!gameplay) return res.status(500).send({ message: 'Aucune partie ne correspond à cette clés.' })
    const samePlayer = await Player.countDocuments({userId,gameplayId:gameplay._id})
    if(samePlayer) return res.status(500).send({ message: 'Joueur déjà en jeu.' })
    const nbPlayer = await Gameplay.countDocuments({gameplayId:gameplay._id})
    if(nbPlayer > 20) return res.status(500).send({ message: 'Nombre maximum de joueur atteint.' })
    const player = new Player({
      userId,
      gameplayId:gameplay._id,
      playerState:'alive'
    })
    await player.save()
    
    res.status(200).json({gameplay:gameplay.toObject()})
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Oops something went wrong' })
  }
}

exports.launchGamePlay = async (req, res) => {
  const onwer = req.user._id
  const { keyJoined } = req.body
  try {
    const gameplay = await Gameplay.findOne({keyJoined})
    if(!gameplay) return res.status(500).send({ message: 'Aucune partie ne correspond à cette clés.' })
    if(gameplay.owner.toString() !== onwer.toString()) return res.status(500).send({ message: 'Seule le propriétaire peut lancer la partie.' })
    if(gameplay.state !== 'pending') return res.status(500).send({ message: 'Partie déjà commencé.' })
    const nbPlayer = await Gameplay.countDocuments({gameplayId:gameplay._id})
    if(nbPlayer < 3) return res.status(500).send({ message: 'Le mombre de joueur minimum requis est 3.' })
    // assign mission to all user

    gameplay.startTime = new Date()
    gameplay.state = 'started'
    await gameplay.save()
    // send notif to all user
    res.status(201).send({gameplay:gameplay.toObject()})
  } catch (e) {
    console.error(e)
    res.status(500).send({ message: 'Oops something went wrong' })
  }
}

