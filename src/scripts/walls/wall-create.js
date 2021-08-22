import createSprite from '../sprites/sprite-create.mjs'
import insertSprite from '../sprites/sprite-insert.mjs'
import positionSprite from '../sprites/sprite-position.mjs'
const wallTop = require('./wall-top')
const wallLeft = require('./wall-left')
const wallZIndex = require('./wall-z-index')
const createWallCapIfExposed = require('./wall-cap-create-if-exposed')

// Creates and returns a wall sprite positioned in the board. If the wall
// has an exposed wall cap, the return value will be an array containing
// both the wall and wall cap sprites.
module.exports = function (board, row, col) {
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
