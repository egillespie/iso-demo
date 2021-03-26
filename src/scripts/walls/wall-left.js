const floorLeft = require('../floors/floor-left')
const wallAdjustLeft = require('./const/wall-adjust-left')

// Calculates the left position of a wall to be shown at the specified position.
module.exports = function (room, row, col) {
  return floorLeft(room, row, col) + wallAdjustLeft
}
