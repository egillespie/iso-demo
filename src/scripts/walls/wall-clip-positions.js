const removeUndefinedRoomPositions = require('../room/room-remove-undefined-positions')

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
module.exports = function (room, row, col) {
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
  return removeUndefinedRoomPositions(room, positions)
}
