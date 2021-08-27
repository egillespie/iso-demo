import { playerAdjustLeft } from './player-const'
import floorLeft from '../floors/floor-left'

// Calculate the left position for placing the player at the specified
// position in an isometric grid.
export default function (board, row, col) {
  return floorLeft(board, row, col) + playerAdjustLeft
}
