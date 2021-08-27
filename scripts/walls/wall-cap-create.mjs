import createSprite from '../sprites/sprite-create.mjs'
import insertSprite from '../sprites/sprite-insert.mjs'
import positionSprite from '../sprites/sprite-position.mjs'
import wallLeft from './wall-left.mjs'
import wallTop from './wall-top.mjs'
import wallZIndex from './wall-z-index.mjs'

// Creates and adds a wall cap of the specified type to the board in the
// specified row and column.
export default function (board, type, row, col, attrs) {
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
