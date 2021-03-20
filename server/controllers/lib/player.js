const { Gameplay } = require('../../schema/gameplay')
const { Player } = require('../../schema/player')


/**
 * The goal here would be to retrieve all the gameplays with the current user in it.
 * To do so, use the token retrieve the _id of the user in the gameplays.
 */
exports.getAllGamePlay = async (req, res) => {
  try {
    const allPlayer = await Player.find({userId:req.user._id}).populate('gameplayId')
    console.log(allPlayer)
    const gameplays = [];
    for(let i = 0; i < allPlayer.length; i++ ) {
        const game = {
            id:allPlayer[i].gameplayId._id,
            playerState:allPlayer[i].playerState,
            gameplayState:allPlayer[i].gameplayId.state,
            name:allPlayer[i].gameplayId.name,
            duration:allPlayer[i].gameplayId.duration,
        }
        gameplays.push(game)
    }
    return res.status(200).json({gameplays})
  } catch (error) {
    console.error(error)
    res.status(400).send({ message: 'Oops something went wrong' })
  }
}