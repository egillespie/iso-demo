const allArrayDifferences = require('../util/array-all-differences')
const wallClipPositions = require('./wall-clip-positions')
const toggleWallOpacity = require('./wall-opacity-toggle')

// Adjusts the wall opacity, turning off opacity on walls in the old position
// that no longer obstruct a sprite in the current position, and turning on
// opacity on walls in the clipping area of the new position.
module.exports = function (board, currentPosition, oldPosition) {
  const [currentRow, currentCol] = currentPosition
  const currentClipPositions = wallClipPositions(board, currentRow, currentCol)
  const allClipPositions = []
  if (oldPosition) {
    const [oldRow, oldCol] = oldPosition
    const oldClipPositions = wallClipPositions(board, oldRow, oldCol)
    const changedPositions = allArrayDifferences(
      currentClipPositions, oldClipPositions
    )
    allClipPositions.push(...changedPositions)
  } else {
    allClipPositions.push(...currentClipPositions)
  }
  toggleWallOpacity(allClipPositions)
}
