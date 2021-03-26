const state = require('../state')
const adjustWallVisibility = require('../walls/walls-adjust-visibility')
const makeAllWallsOpaque = require('../walls/walls-make-all-opaque')

// Turns opacity of walls obstructing the player on or off.
module.exports = function () {
  state.seeThroughWalls = !state.seeThroughWalls
  if (state.seeThroughWalls) {
    adjustWallVisibility(
      state.currentRoom,
      [state.player.row, state.player.col]
    )
  } else {
    makeAllWallsOpaque()
  }
}
