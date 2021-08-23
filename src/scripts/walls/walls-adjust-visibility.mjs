import state from '../state/index.mjs'
import moveWallOpacity from './wall-opacity-move.mjs'
import moveClippedWallCaps from './wall-caps-move-clipped.mjs'

// Makes walls opaque or translucent depending on the change in position
// and removes or creates wall caps where exposed due to wall translucency.
export default function (board, currentPosition, oldPosition) {
  if (state.seeThroughWalls) {
    moveWallOpacity(board, currentPosition, oldPosition)
    moveClippedWallCaps(board, currentPosition, oldPosition)
  }
}
