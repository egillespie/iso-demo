const state = require('../state')
const canPlayerMoveTo = require('./player-can-move-to-position')
const positionSprite = require('../sprites/sprite-position')
const playerLeft = require('./player-left')
const playerTop = require('./player-top')
const playerZIndex = require('./player-z-index')
const adjustWallVisibility = require('../walls/walls-adjust-visibility')

module.exports = function (board, row, col) {
  if (canPlayerMoveTo(row, col)) {
    const player = state.dom.player
    positionSprite(
      player,
      playerTop(row, col),
      playerLeft(board, row, col),
      playerZIndex(row, col)
    )
    adjustWallVisibility(
      board,
      [row, col],
      [player.row, player.col]
    )
    player.col = col
    player.row = row
  }
}
