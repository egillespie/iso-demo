import floorWidth from '../../floors/const/floor-width.mjs'
import wallWidth from './wall-width.mjs'

// The amount a wall must be moved to the left to appear centered
// on a floor tile.
export default (floorWidth - wallWidth) / 2
