const state = require('../state')
const movePlayerTo = require('./player-move-to-position')

// Moves the player one tile in the specified direction. Use the cardinal
// direction constants at `player/const/player-cardinal-*.js` as the second
// parameter to this function. It's usually more convenient to call the
// `player/player-move-*.js` functions instead of calling this function.
module.exports = function (dir) {
  movePlayerTo(
    state.currentRoom,
    state.player.row + dir.rowAdjust,
    state.player.col + dir.colAdjust
  )
}
