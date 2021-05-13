const createSprite = require('../sprites/sprite-create')
const positionSprite = require('../sprites/sprite-position')
const floorTop = require('./floor-top')
const floorLeft = require('./floor-left')
const floorZIndex = require('./floor-z-index')

// Creates and places a floor sprite at the provided row and column in a board
module.exports = function (board, row, col) {
  if (board[row][col] === undefined) return
  const floor = createSprite(`f${row}-${col}`)
  floor.classList.add('floor')
  positionSprite(
    floor,
    floorTop(row, col),
    floorLeft(board, row, col),
    floorZIndex(row, col)
  )
  return floor
}
