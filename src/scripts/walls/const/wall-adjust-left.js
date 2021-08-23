import floorWidth from '../../floors/const/floor-width.mjs'
const wallWidth = require('./wall-width')

// The amount a wall must be moved to the left to appear centered
// on a floor tile.
module.exports = (floorWidth - wallWidth) / 2
