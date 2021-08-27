import state from '../state/index.mjs'

// Returns true if no walls exist in the specified position, allowing
// the player to move there. Returns false otherwise.
export default function (row, col) {
  return state.currentBoard[row] !== undefined &&
    state.currentBoard[row][col] === null
}
