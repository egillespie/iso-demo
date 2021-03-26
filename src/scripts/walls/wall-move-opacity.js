const allArrayDifferences = require('../util/array-all-differences')
const wallClipPositions = require('./wall-clip-positions')
const toggleWallOpacity = require('./wall-toggle-opacity')

// Adjusts the wall opacity, turning off opacity on walls in the old position
// that no longer obstruct a sprite in the current position, and turning on
// opacity on walls in the clipping area of the new position.
module.exports = function (room, currentPosition, oldPosition) {
  const [currentRow, currentCol] = currentPosition
  const currentClipPositions = wallClipPositions(room, currentRow, currentCol)
  const allClipPositions = []
  if (oldPosition) {
    const [oldRow, oldCol] = oldPosition
    const oldClipPositions = wallClipPositions(room, oldRow, oldCol)
    const changedPositions = allArrayDifferences(
      currentClipPositions, oldClipPositions
    )
    allClipPositions.push(...changedPositions)
  } else {
    allClipPositions.push(...currentClipPositions)
  }
  toggleWallOpacity(allClipPositions)
}
