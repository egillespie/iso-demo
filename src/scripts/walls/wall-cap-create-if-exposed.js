const createWallCap = require('./wall-cap-create')
const exposedWallCapType = require('./wall-cap-exposed-type')

// Determines if a wall cap at the specified position is exposed due to
// empty or translucent walls nearby, then creates and returns a wall cap
// sprite if necessary to cover the exposed space.
module.exports = function (board, row, col) {
  const capType = exposedWallCapType(board, row, col)
  if (capType) {
    return createWallCap(board, capType, row, col)
  }
}
