const floorAdjustTop = require('./const/floor-adjust-top')
const wallHeight = require('../walls/const/wall-height')

// Calculate the top location of a floor sprite given a row and column
// to render it in an isometric grid. Always add wall height to top so
// walls do not get clipped by top of render window.
module.exports = function (row, col) {
  return wallHeight + ((row + col) * floorAdjustTop)
}
