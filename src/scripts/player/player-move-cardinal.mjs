import movePlayerTo from './player-move-to-position.mjs'

import state from '../state/index.mjs'

// Moves the player one tile in the specified direction. Use the cardinal
// direction constants at `player/const/player-cardinal-*.js` as the second
// parameter to this function. It's usually more convenient to call the
// `player/player-move-*.js` functions instead of calling this function.
export default function (dir) {
  movePlayerTo(
    state.player.row + dir.rowAdjust,
    state.player.col + dir.colAdjust
  )
}
