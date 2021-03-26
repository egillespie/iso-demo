const floorWidth = require('../../floors/const/floor-width')
const wallWidth = require('./wall-width')

// The amount a wall must be moved to the left to appear centered
// on a floor tile.
module.exports = (floorWidth - wallWidth) / 2
