import floorZIndex from '../floors/floor-z-index.mjs'

// Calculate the z-index for placing the player at the specified
// position in an isometric grid.
export default function (row, col) {
  return floorZIndex(row, col) + 1
}
