const createSprite = require('../sprites/sprite-create')
const positionSprite = require('../sprites/sprite-position')
const insertSprite = require('../sprites/sprite-insert')
const wallLeft = require('./wall-left')
const wallTop = require('./wall-top')
const wallZIndex = require('./wall-z-index')

// Creates and adds a wall cap of the specified type to the board in the
// specified row and column.
module.exports = function (board, type, row, col, attrs) {
  const id = attrs?.id || `c${row}-${col}`
  const cap = createSprite(id, attrs)
  cap.classList.add('cap', type)
  positionSprite(
    cap,
    wallTop(row, col),
    wallLeft(board, row, col),
    wallZIndex(row, col)
  )
  insertSprite(cap)
}
