const state = require('../state')
const moveWallOpacity = require('./wall-opacity-move')
const moveClippedWallCaps = require('./wall-caps-move-clipped')

// Makes walls opaque or translucent depending on the change in position
// and removes or creates wall caps where exposed due to wall translucency.
module.exports = function (board, currentPosition, oldPosition) {
  if (state.seeThroughWalls) {
    moveWallOpacity(board, currentPosition, oldPosition)
    moveClippedWallCaps(board, currentPosition, oldPosition)
  }
}
