import playerAdjustTop from './const/player-adjust-top.mjs'
const floorTop = require('../floors/floor-top')

// Calculate the top position for placing the player at the specified
// position in an isometric grid.
module.exports = function (row, col) {
  return floorTop(row, col) - playerAdjustTop
}
