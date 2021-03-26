const positionSprite = require('../sprites/sprite-position')
const wallLeft = require('./wall-left')
const wallTop = require('./wall-top')
const wallZIndex = require('./wall-z-index')

// Creates and adds a wall cap of the specified type to the room in the
// specified row and column.
module.exports = function (room, type, row, col) {
  const cap = document.createElement('div')
  cap.id = `c${row}-${col}`
  cap.classList.add('cap', type)
  positionSprite(
    cap,
    wallTop(row, col),
    wallLeft(room, row, col),
    wallZIndex(row, col)
  )
  return cap
}
