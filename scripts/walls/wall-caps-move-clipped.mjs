import allArrayDifferences from '../util/array-all-differences.mjs'
import wallCapClipPositions from './wall-cap-clip-positions.mjs'
import toggleClippedWallCaps from './wall-caps-toggle-clipped.mjs'

// Removes wall caps that are no longer exposed by translucent walls and
// adds new wall caps where newly exposed because of wall translucency.
export default function (board, currentPosition, oldPosition) {
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
