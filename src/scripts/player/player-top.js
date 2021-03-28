const floorTop = require('../floors/floor-top')
const playerAdjustTop = require('./const/player-adjust-top')

// Calculate the top position for placing the player at the specified
// position in an isometric grid.
module.exports = function (row, col) {
  return floorTop(row, col) - playerAdjustTop
}
