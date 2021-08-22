import playerWidth from './player-width.mjs'
const floorWidth = require('../../floors/const/floor-width')

// The horizontal amount to adjust the player sprite to place it at a
// specific location in an isometric grid.
export default (floorWidth - playerWidth) / 2
