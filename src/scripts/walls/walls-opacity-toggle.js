const state = require('../state')
const adjustWallVisibility = require('./walls-adjust-visibility')
const makeAllWallsOpaque = require('./walls-make-all-opaque')

// Turns opacity of walls obstructing the player on or off.
module.exports = function () {
  state.seeThroughWalls = !state.seeThroughWalls
  if (state.seeThroughWalls) {
    adjustWallVisibility(
      state.currentBoard,
      [state.dom.player.row, state.dom.player.col]
    )
  } else {
    makeAllWallsOpaque()
  }
}
