import playerAdjustLeft from './const/player-adjust-left.mjs'
const floorLeft = require('../floors/floor-left')

// Calculate the left position for placing the player at the specified
// position in an isometric grid.
module.exports = function (board, row, col) {
  return floorLeft(board, row, col) + playerAdjustLeft
}
