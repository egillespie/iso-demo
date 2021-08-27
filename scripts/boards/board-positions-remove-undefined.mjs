// Returns a filtered array of positions that contain only positions that
// exist (are not `undefined`) in the specified board.
export default function (board, positions) {
  return positions.filter(position => {
    const [row, col] = position
    return board[row] && board[row][col] !== undefined
  })
}
