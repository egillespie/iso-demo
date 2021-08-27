import createWallCap from './wall-cap-create'
import exposedWallCapType from './wall-cap-exposed-type'

// Determines if a wall cap at the specified position is exposed due to
// empty or translucent walls nearby, then creates and returns a wall cap
// sprite if necessary to cover the exposed space.
export default function (board, row, col, attrs) {
  const capType = exposedWallCapType(board, row, col)
  if (capType) {
    createWallCap(board, capType, row, col, attrs)
  }
}
