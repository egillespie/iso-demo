import movePlayerTo from './player-move-to-position'
import state from '../state/index'

// Moves the player one tile in the specified direction. Use the cardinal
// direction constants in `player/player-const.mjs` (north, south, east, weat)
// as the second parameter to this function. It's more convenient to call the
// `player/player-move-*.js` functions instead of calling this function.
export default function (dir) {
  movePlayerTo(
    state.player.row + dir.rowAdjust,
    state.player.col + dir.colAdjust
  )
}
