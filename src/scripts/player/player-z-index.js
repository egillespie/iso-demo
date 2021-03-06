const floorZIndex = require('../floors/floor-z-index')

// Calculate the z-index for placing the player at the specified
// position in an isometric grid.
module.exports = function (row, col) {
  return floorZIndex(row, col) + 1
}
