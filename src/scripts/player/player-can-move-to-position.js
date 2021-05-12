const state = require('../state')

// Returns true if no walls exist in the specified position, allowing
// the player to move there. Returns false otherwise.
module.exports = function (row, col) {
  return (
    row >= 0 &&
    col >= 0 &&
    row < state.currentBoard.length &&
    col < state.currentBoard[row].length &&
    !document.getElementById(`w${row}-${col}`)
  )
}
