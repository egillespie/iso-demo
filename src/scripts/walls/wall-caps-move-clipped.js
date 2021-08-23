import allArrayDifferences from '../util/array-all-differences.mjs'
const wallCapClipPositions = require('./wall-cap-clip-positions')
const toggleClippedWallCaps = require('./wall-caps-toggle-clipped')

// Removes wall caps that are no longer exposed by translucent walls and
// adds new wall caps where newly exposed because of wall translucency.
module.exports = function (board, currentPosition, oldPosition) {
  const [currentRow, currentCol] = currentPosition
  const currentCapPositions = wallCapClipPositions(board, currentRow, currentCol)
  const allCapPositions = []
  if (oldPosition) {
    const [oldRow, oldCol] = oldPosition
    const oldCapPositions = wallCapClipPositions(board, oldRow, oldCol)
    const changedPositions = allArrayDifferences(
      currentCapPositions, oldCapPositions
    )
    allCapPositions.push(...changedPositions)
  } else {
    allCapPositions.push(...currentCapPositions)
  }
  toggleClippedWallCaps(board, allCapPositions)
}
