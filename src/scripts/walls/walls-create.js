const insertSprite = require('../sprites/sprite-insert')
const createWall = require('./wall-create')

// Creates and renders all of the walls and wall caps in the room
module.exports = function (room) {
  for (let row = 0; row < room.length; row++) {
    for (let col = 0; col < room[row].length; col++) {
      insertSprite(createWall(room, row, col))
    }
  }
}
