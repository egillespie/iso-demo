import createSprite from '../sprites/sprite-create'
import insertSprite from '../sprites/sprite-insert'
import positionSprite from '../sprites/sprite-position'
import floorTop from './floor-top'
import floorLeft from './floor-left'
import floorZIndex from './floor-z-index'

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
