import floorHeight from './floor-height.mjs'
import floorLift from './floor-lift.mjs'

// The amount to adjust the top of floor sprite so it can be
// tiled in an isometric grid.
export default (floorHeight - floorLift) / 2
