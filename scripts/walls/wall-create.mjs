import createSprite from '../sprites/sprite-create.mjs'
import insertSprite from '../sprites/sprite-insert.mjs'
import positionSprite from '../sprites/sprite-position.mjs'
import wallTop from './wall-top.mjs'
import wallLeft from './wall-left.mjs'
import wallZIndex from './wall-z-index.mjs'
import createWallCapIfExposed from './wall-cap-create-if-exposed.mjs'

// Creates and returns a wall sprite positioned in the board. If the wall
// has an exposed wall cap, the return value will be an array containing
// both the wall and wall cap sprites.
export default function (board, row, col) {
  const wallType = board[row][col]
  if (wallType && wallType.length) {
    const wall = createSprite(`w${row}-${col}`)
    wall.classList.add('wall', wallType)
    positionSprite(
      wall,
      wallTop(row, col),
      wallLeft(board, row, col),
      wallZIndex(row, col)
    )
    insertSprite(wall)
    createWallCapIfExposed(board, row, col)
  }
}
