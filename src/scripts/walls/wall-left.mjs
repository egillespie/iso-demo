import floorLeft from '../floors/floor-left.mjs'
import wallAdjustLeft from './const/wall-adjust-left.mjs'

// Calculates the left position of a wall to be shown at the specified position.
export default function (board, row, col) {
  return floorLeft(board, row, col) + wallAdjustLeft
}
