const allArrayDifferences = require('../util/array-all-differences')
const wallCapClipPositions = require('./wall-cap-clip-positions')
const toggleClippedWallCaps = require('./wall-caps-toggle-clipped')

// Removes wall caps that are no longer exposed by translucent walls and
// adds new wall caps where newly exposed because of wall translucency.
module.exports = function (room, currentPosition, oldPosition) {
  const [currentRow, currentCol] = currentPosition
  const currentCapPositions = wallCapClipPositions(room, currentRow, currentCol)
  const allCapPositions = []
  if (oldPosition) {
    const [oldRow, oldCol] = oldPosition
    const oldCapPositions = wallCapClipPositions(room, oldRow, oldCol)
    const changedPositions = allArrayDifferences(
      currentCapPositions, oldCapPositions
    )
    allCapPositions.push(...changedPositions)
  } else {
    allCapPositions.push(...currentCapPositions)
  }
  toggleClippedWallCaps(room, allCapPositions)
}
