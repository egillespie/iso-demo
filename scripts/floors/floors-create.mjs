import createFloor from './floor-create'

// Creates and places all of the floor tiles of a board
export default function (board) {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      createFloor(board, row, col)
    }
  }
}
