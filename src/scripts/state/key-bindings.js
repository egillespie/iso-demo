const toggleOpacity = require('../walls/walls-opacity-toggle')
const togglePlayerSprite = require('../player/player-sprite-toggle')
const movePlayerNorth = require('../player/player-move-north')
const movePlayerEast = require('../player/player-move-east')
const movePlayerSouth = require('../player/player-move-south')
const movePlayerWest = require('../player/player-move-west')

// Maps `KeyboardEvent.code` values to actions that the player may perform.
module.exports = {
  KeyO: toggleOpacity,
  KeyP: togglePlayerSprite,
  KeyA: movePlayerWest,
  ArrowLeft: movePlayerWest,
  KeyW: movePlayerNorth,
  ArrowUp: movePlayerNorth,
  KeyD: movePlayerEast,
  ArrowRight: movePlayerEast,
  KeyS: movePlayerSouth,
  ArrowDown: movePlayerSouth
}
