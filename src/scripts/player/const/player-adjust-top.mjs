import playerHeight from './player-height.mjs'
import playerLift from './player-lift.mjs'
import { floorHeight, floorLift } from '../../floors/floor-const.mjs'

// The vertical amount to adjust the player sprite to place it at a
// specific location in an isometric grid.
export default playerHeight - floorHeight + floorLift + playerLift
