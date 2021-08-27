import state from '../state/index'
import moveWallOpacity from './wall-opacity-move'
import moveClippedWallCaps from './wall-caps-move-clipped'

// Makes walls opaque or translucent depending on the change in position
// and removes or creates wall caps where exposed due to wall translucency.
export default function (board, currentPosition, oldPosition) {
  if (state.seeThroughWalls) {
    moveWallOpacity(board, currentPosition, oldPosition)
    moveClippedWallCaps(board, currentPosition, oldPosition)
  }
}
