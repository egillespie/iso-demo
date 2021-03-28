const floorHeight = require('../../floors/const/floor-height')
const floorLift = require('../../floors/const/floor-lift')
const playerHeight = require('./player-height')
const playerLift = require('./player-lift')

// The vertical amount to adjust the player sprite to place it at a
// specific location in an isometric grid.
module.exports = playerHeight - floorHeight + floorLift + playerLift
