import toggleWallOpacity from './wall-opacity-toggle'
import allArrayDifferences from '../util/array-all-differences'
import wallClipPositions from './wall-clip-positions'

// Adjusts the wall opacity, turning off opacity on walls in the old position
// that no longer obstruct a sprite in the current position, and turning on
// opacity on walls in the clipping area of the new position.
export default function (board, currentPosition, oldPosition) {
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
