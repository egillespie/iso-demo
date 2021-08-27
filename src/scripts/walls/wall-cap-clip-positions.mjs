import removeUndefinedBoardPositions from '../boards/board-positions-remove-undefined'

// Returns an array of wall positions that may leave exposed wall caps if
// not connected to a solid/opaque wall.
//
// Example, where `W` is the wall position and `C` are the possible clipping
// positions.
//
// ```
// ..C...
// .W.C..
// C...C.
// .C....
// ..C...
// ```
export default function (board, row, col) {
  const positions = [
    [row + 1, col - 1],
    [row + 2, col],
    [row + 3, col + 1],
    [row - 1, col + 1],
    [row, col + 2],
    [row + 1, col + 3]
  ]
  return removeUndefinedBoardPositions(board, positions)
}
