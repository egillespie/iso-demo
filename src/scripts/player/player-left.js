const floorLeft = require('../floors/floor-left')
const playerAdjustLeft = require('./const/player-adjust-left')

// Calculate the left position for placing the player at the specified
// position in an isometric grid.
module.exports = function (room, row, col) {
  return floorLeft(room, row, col) + playerAdjustLeft
}
