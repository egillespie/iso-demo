import floorTop from '../floors/floor-top.mjs'
import { wallAdjustTop } from './wall-const.mjs'

// Calculates the top position of a wall as the top position of a floor at
// the same position, adjusted vertically to align with surrounding sprites.
export default function (row, col) {
  return floorTop(row, col) - wallAdjustTop
}
