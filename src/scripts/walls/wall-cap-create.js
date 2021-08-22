import createSprite from '../sprites/sprite-create.mjs'
import insertSprite from '../sprites/sprite-insert.mjs'
import positionSprite from '../sprites/sprite-position.mjs'
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
