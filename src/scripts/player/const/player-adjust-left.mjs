import playerWidth from './player-width.mjs'
import { floorWidth } from '../../floors/floor-const.mjs'

// The horizontal amount to adjust the player sprite to place it at a
// specific location in an isometric grid.
export default (floorWidth - playerWidth) / 2
