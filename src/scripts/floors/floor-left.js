const floorAdjustLeft = require('./const/floor-adjust-left')

// Calculate the left location of a floor sprite given a row and column
// to render it in an isometric grid.
module.exports = function (room, row, col) {
  const lastRow = room.length - 1
  const rowLeft = ((lastRow - row) * floorAdjustLeft)
  return rowLeft + col * floorAdjustLeft
}
