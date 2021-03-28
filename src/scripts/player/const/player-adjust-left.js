const floorWidth = require('../../floors/const/floor-width')
const playerWidth = require('./player-width')

// The horizontal amount to adjust the player sprite to place it at a
// specific location in an isometric grid.
module.exports = (floorWidth - playerWidth) / 2
