const isPositionVisible = require('../rooms/room-position-is-visible')

// Looks up the wall at the specified position and if found:
//  - Returns 'swc' if the wall has an exposed south-facing wall cap
//  - Returns 'ewc' if the wall has an exposed east-facing wall cap
//  - Returns 'sec' if the wall has exposed east- and south-facing wall caps
//  - Returns undefined otherwise
module.exports = function (room, row, col) {
  const wallType = room[row][col]
  const swcExposed = (
    row === room.length - 1 ||
    (isPositionVisible(room, row + 1, col) && !isPositionVisible(room, row, col))
  )
  const ewcExposed = (
    col === room[row].length - 1 ||
    (isPositionVisible(room, row, col + 1) && !isPositionVisible(room, row, col))
  )
  switch (wallType) {
    case 'eww':
    case 'new':
    case 'set':
      // South-facing wall cap
      if (swcExposed) {
        return 'swc'
      }
      break
    case 'nsw':
    case 'sww':
    case 'swt':
      // East-facing wall cap
      if (ewcExposed) {
        return 'ewc'
      }
      break
    case 'crt':
    case 'net':
    case 'nww':
    case 'nwt': {
      // South- and east-facing wall caps
      if (swcExposed && ewcExposed) {
        return 'sec'
      } else if (swcExposed) {
        return 'swc'
      } else if (ewcExposed) {
        return 'ewc'
      }
      break
    }
  }
}
