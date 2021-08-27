import createWall from './wall-create.mjs'

// Creates and renders all of the walls and wall caps in the board
export default function (board) {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      createWall(board, row, col)
    }
  }
}
