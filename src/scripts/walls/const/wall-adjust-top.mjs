import floorHeight from '../../floors/const/floor-height.mjs'
import floorLift from '../../floors/const/floor-lift.mjs'
import wallHeight from './wall-height.mjs'
import wallLift from './wall-lift.mjs'

// The amount a wall's top position must be adjusted so it appears
// isometrically centered on a floor tile
export default wallHeight - floorHeight + floorLift + wallLift
