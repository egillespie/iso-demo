const floorLeft = require('../floors/floor-left')
const wallAdjustLeft = require('./const/wall-adjust-left')

// Calculates the left position of a wall to be shown at the specified position.
module.exports = function (board, row, col) {
  return floorLeft(board, row, col) + wallAdjustLeft
}
