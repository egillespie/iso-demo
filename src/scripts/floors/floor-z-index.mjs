// Determines the z-index required to place a floor sprite
// in an isometric grid so other sprites appropriately render
// in front of or behind it.
export default function (row, col) {
  return (row + col) * 10
}
