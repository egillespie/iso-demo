const floorHeight = require('./floor-height')
const floorLift = require('./floor-lift')

// The amount to adjust the top of floor sprite so it can be
// tiled in an isometric grid.
module.exports = (floorHeight - floorLift) / 2
