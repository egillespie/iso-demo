import floorLeft from '../floors/floor-left'
import { wallAdjustLeft } from './wall-const'

// Calculates the left position of a wall to be shown at the specified position.
export default function (board, row, col) {
  return floorLeft(board, row, col) + wallAdjustLeft
}
