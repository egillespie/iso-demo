import playerHeight from './player-height.mjs'
import playerLift from './player-lift.mjs'
import floorHeight from '../../floors/const/floor-height.mjs'
import floorLift from '../../floors/const/floor-lift.mjs'

// The vertical amount to adjust the player sprite to place it at a
// specific location in an isometric grid.
export default playerHeight - floorHeight + floorLift + playerLift
