const state = require('../state')

// Returns true if no walls exist in the specified position, allowing
// the player to move there. Returns false otherwise.
module.exports = function (row, col) {
  return state.currentBoard[row] !== undefined &&
    state.currentBoard[row][col] === null
}
