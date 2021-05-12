// Returns true if a wall exists at the specified position in the board
// and the wall is not translucent. Returns false otherwise.
module.exports = function (board, row, col) {
  if (board[row][col]) {
    const wall = document.getElementById(`w${row}-${col}`)
    return wall && wall.classList.contains('translucent')
  }
  return true
}
