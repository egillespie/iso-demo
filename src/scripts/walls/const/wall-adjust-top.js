import floorHeight from '../../floors/const/floor-height.mjs'
import floorLift from '../../floors/const/floor-lift.mjs'
const wallHeight = require('./wall-height')
const wallLift = require('./wall-lift')

// The amount a wall's top position must be adjusted so it appears
// isometrically centered on a floor tile
module.exports = wallHeight - floorHeight + floorLift + wallLift
