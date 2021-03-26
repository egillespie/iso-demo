const insertSprite = require('../sprites/sprite-insert')
const createFloor = require('./floor-create')

// Creates and places all of the floor tiles of a room
module.exports = function (room) {
  for (let row = 0; row < room.length; row++) {
    for (let col = 0; col < room[row].length; col++) {
      insertSprite(createFloor(room, row, col))
    }
  }
}
