const removeUndefinedRoomPositions = require('../room/room-remove-undefined-positions')

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
module.exports = function (room, row, col) {
  const positions = [
    [row + 1, col - 1],
    [row + 2, col],
    [row + 3, col + 1],
    [row - 1, col + 1],
    [row, col + 2],
    [row + 1, col + 3]
  ]
  return removeUndefinedRoomPositions(room, positions)
}