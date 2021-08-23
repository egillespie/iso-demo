import playerAdjustLeft from './const/player-adjust-left.mjs'
import floorLeft from '../floors/floor-left.mjs'

// Calculate the left position for placing the player at the specified
// position in an isometric grid.
export default function (board, row, col) {
  return floorLeft(board, row, col) + playerAdjustLeft
}
