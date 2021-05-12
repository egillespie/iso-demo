const createSprite = require('../sprites/sprite-create')
const positionSprite = require('../sprites/sprite-position')
const wallLeft = require('./wall-left')
const wallTop = require('./wall-top')
const wallZIndex = require('./wall-z-index')

// Creates and adds a wall cap of the specified type to the board in the
// specified row and column.
module.exports = function (board, type, row, col) {
  const cap = createSprite(`c${row}-${col}`)
  cap.classList.add('cap', type)
  positionSprite(
    cap,
    wallTop(row, col),
    wallLeft(board, row, col),
    wallZIndex(row, col)
  )
  return cap
}
