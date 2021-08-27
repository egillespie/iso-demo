import playerLeft from './player-left'
import canPlayerMoveTo from './player-can-move-to-position'
import playerTop from './player-top'
import playerZIndex from './player-z-index'
import positionSprite from '../sprites/sprite-position'
import state from '../state/index'
import adjustWallVisibility from '../walls/walls-adjust-visibility'

export default function (row, col) {
  if (canPlayerMoveTo(row, col)) {
    positionSprite(
      state.dom.player,
      playerTop(row, col),
      playerLeft(state.currentBoard, row, col),
      playerZIndex(row, col)
    )
    adjustWallVisibility(
      state.currentBoard,
      [row, col],
      [state.player.row, state.player.col]
    )
    state.player.col = col
    state.player.row = row
  }
}
