import playerLeft from './player-left.mjs'
import canPlayerMoveTo from './player-can-move-to-position.mjs'
import playerTop from './player-top.mjs'
import playerZIndex from './player-z-index.mjs'
import positionSprite from '../sprites/sprite-position.mjs'
const state = require('../state')
const adjustWallVisibility = require('../walls/walls-adjust-visibility')

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
