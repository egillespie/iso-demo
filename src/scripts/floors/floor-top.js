const floorAdjustTop = require('./const/floor-adjust-top')

// Calculate the top location of a floor sprite given a row and column
// to render it in an isometric grid.
module.exports = function (row, col) {
  return 60 + ((row + col) * floorAdjustTop)
}
