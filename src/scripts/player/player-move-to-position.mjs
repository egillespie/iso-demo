const state = require('../state')
const canPlayerMoveTo = require('./player-can-move-to-position')
const positionSprite = require('../sprites/sprite-position')
const playerLeft = require('./player-left')
const playerTop = require('./player-top')
const playerZIndex = require('./player-z-index')
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
