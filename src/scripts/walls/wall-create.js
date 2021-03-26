const positionSprite = require('../sprites/sprite-position')
const wallTop = require('./wall-top')
const wallLeft = require('./wall-left')
const wallZIndex = require('./wall-z-index')
const createWallCapIfExposed = require('./wall-cap-create-if-exposed')

// Creates and returns a wall sprite positioned in the room. If the wall
// has an exposed wall cap, the return value will be an array containing
// both the wall and wall cap sprites.
module.exports = function (room, row, col) {
  const wallType = room[row][col]
  if (wallType && wallType.length) {
    const wall = document.createElement('div')
    wall.id = `w${row}-${col}`
    wall.classList.add('wall', wallType)
    positionSprite(
      wall,
      wallTop(row, col),
      wallLeft(room, row, col),
      wallZIndex(row, col)
    )
    const cap = createWallCapIfExposed(room, row, col)
    return cap ? [wall, cap] : wall
  }
}
