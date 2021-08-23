import { floorHeight, floorLift } from '../../floors/floor-const.mjs'
import wallHeight from './wall-height.mjs'
import wallLift from './wall-lift.mjs'

// The amount a wall's top position must be adjusted so it appears
// isometrically centered on a floor tile
export default wallHeight - floorHeight + floorLift + wallLift
