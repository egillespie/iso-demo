import { playerAdjustTop } from './player-const'
import floorTop from '../floors/floor-top'

// Calculate the top position for placing the player at the specified
// position in an isometric grid.
export default function (row, col) {
  return floorTop(row, col) - playerAdjustTop
}
