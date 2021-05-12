const floorLeft = require('../floors/floor-left')
const playerAdjustLeft = require('./const/player-adjust-left')

// Calculate the left position for placing the player at the specified
// position in an isometric grid.
module.exports = function (board, row, col) {
  return floorLeft(board, row, col) + playerAdjustLeft
}
