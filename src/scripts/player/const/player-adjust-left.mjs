import playerWidth from './player-width.mjs'
import floorWidth from '../../floors/const/floor-width.mjs'

// The horizontal amount to adjust the player sprite to place it at a
// specific location in an isometric grid.
export default (floorWidth - playerWidth) / 2
