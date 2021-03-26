const floorZIndex = require('../floors/floor-z-index')

// Calculates the z-index of a wall drawn at the specified position so
// closer walls obscure it and it obscures walls farther away.
module.exports = function (row, col) {
  return floorZIndex(row, col) + 1
}
