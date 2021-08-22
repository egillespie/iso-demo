import playerHeight from './player-height.mjs'
import playerLift from './player-lift.mjs'
const floorHeight = require('../../floors/const/floor-height')
const floorLift = require('../../floors/const/floor-lift')

// The vertical amount to adjust the player sprite to place it at a
// specific location in an isometric grid.
export default playerHeight - floorHeight + floorLift + playerLift
