const insertSprite = require('../sprites/sprite-insert')
const createFloor = require('./floor-create')

// Creates and places all of the floor tiles of a board
module.exports = function (board) {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      insertSprite(createFloor(board, row, col))
    }
  }
}
