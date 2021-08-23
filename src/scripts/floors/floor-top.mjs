import floorAdjustTop from './const/floor-adjust-top.mjs'
import wallHeight from '../walls/const/wall-height.mjs'

// Calculate the top location of a floor sprite given a row and column
// to render it in an isometric grid. Always add wall height to top so
// walls do not get clipped by top of render window.
export default function (row, col) {
  return wallHeight + ((row + col) * floorAdjustTop)
}
