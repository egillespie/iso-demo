const state = require('../state')
const toggleOpacity = require('../walls/walls-opacity-toggle')
const togglePlayerSprite = require('../player/player-sprite-toggle')
const movePlayerNorth = require('../player/player-move-north')
const movePlayerEast = require('../player/player-move-east')
const movePlayerSouth = require('../player/player-move-south')
const movePlayerWest = require('../player/player-move-west')

module.exports = function (event) {
  switch (event.code) {
    case 'KeyO':
      // Toggle translucent/solid walls
      event.preventDefault()
      toggleOpacity()
      break
    case 'KeyP':
      // Toggle player image
      event.preventDefault()
      togglePlayerSprite()
      break
    case 'KeyA':
    case 'ArrowLeft':
      // Move west (up and left)
      event.preventDefault()
      movePlayerWest(state.currentRoom)
      break
    case 'KeyW':
    case 'ArrowUp':
      // Move north (up and right)
      event.preventDefault()
      movePlayerNorth(state.currentRoom)
      break
    case 'KeyD':
    case 'ArrowRight':
      // Move east (down and right)
      event.preventDefault()
      movePlayerEast(state.currentRoom)
      break
    case 'KeyS':
    case 'ArrowDown':
      // Move south (down and left)
      event.preventDefault()
      movePlayerSouth(state.currentRoom)
      break
  }
}
