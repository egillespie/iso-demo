import floorAdjustLeft from './const/floor-adjust-left.mjs'

// Calculate the left location of a floor sprite given a row and column
// to render it in an isometric grid.
export default function (board, row, col) {
  const lastRow = board.length - 1
  const rowLeft = ((lastRow - row) * floorAdjustLeft)
  return rowLeft + col * floorAdjustLeft
}
