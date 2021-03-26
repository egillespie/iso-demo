const floorHeight = require('../../floors/const/floor-height')
const floorLift = require('../../floors/const/floor-lift')
const wallHeight = require('./wall-height')
const wallLift = require('./wall-lift')

// The amount a wall's top position must be adjusted so it appears
// isometrically centered on a floor tile
module.exports = wallHeight - floorHeight + floorLift + wallLift
