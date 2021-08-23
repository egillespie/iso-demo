import removeUndefinedBoardPositions from '../boards/board-positions-remove-undefined.mjs'

// Returns an array of wall positions that may clip a sprite appearing
// at the specified row and column.
//
// Example, where `S` is the sprite location and `C` are the possible clipping
// positions.
//
// ```
// ......
// .SC...
// .CCC..
// ..CCC.
// ...CC.
// ```
module.exports = function (board, row, col) {
  const positions = [
    [row, col + 1],
    [row + 1, col],
    [row + 1, col + 1],
    [row + 1, col + 2],
    [row + 2, col + 1],
    [row + 2, col + 2],
    [row + 2, col + 3],
    [row + 3, col + 2],
    [row + 3, col + 3]
  ]
  return removeUndefinedBoardPositions(board, positions)
}
