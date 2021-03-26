const state = require('../state')
const moveWallOpacity = require('./wall-move-opacity')
const moveClippedWallCaps = require('./wall-caps-move-clipped')

// Makes walls opaque or translucent depending on the change in position
// and removes or creates wall caps where exposed due to wall translucency.
module.exports = function (room, currentPosition, oldPosition) {
  if (state.seeThroughWalls) {
    moveWallOpacity(room, currentPosition, oldPosition)
    moveClippedWallCaps(room, currentPosition, oldPosition)
  }
}
