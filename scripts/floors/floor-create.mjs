import createSprite from '../sprites/sprite-create.mjs'
import insertSprite from '../sprites/sprite-insert.mjs'
import positionSprite from '../sprites/sprite-position.mjs'
import floorTop from './floor-top.mjs'
import floorLeft from './floor-left.mjs'
import floorZIndex from './floor-z-index.mjs'

// Creates and places a floor sprite at the provided row and column in a board
export default function (board, row, col) {
  if (board[row][col] === undefined) return
  const floor = createSprite(`f${row}-${col}`)
  floor.classList.add('floor')
  positionSprite(
    floor,
    floorTop(row, col),
    floorLeft(board, row, col),
    floorZIndex(row, col)
  )
  insertSprite(floor)
}
