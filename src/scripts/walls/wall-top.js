import floorTop from '../floors/floor-top.mjs'
const wallAdjustTop = require('./const/wall-adjust-top')

// Calculates the top position of a wall as the top position of a floor at
// the same position, adjusted vertically to align with surrounding sprites.
module.exports = function (row, col) {
  return floorTop(row, col) - wallAdjustTop
}
