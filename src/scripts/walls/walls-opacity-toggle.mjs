import state from '../state/index.mjs'
import adjustWallVisibility from './walls-adjust-visibility.mjs'
import makeAllWallsOpaque from './walls-make-all-opaque.mjs'

// Turns opacity of walls obstructing the player on or off.
export default function () {
  state.seeThroughWalls = !state.seeThroughWalls
  if (state.seeThroughWalls) {
    adjustWallVisibility(
      state.currentBoard,
      [state.player.row, state.player.col]
    )
  } else {
    makeAllWallsOpaque()
  }
}
