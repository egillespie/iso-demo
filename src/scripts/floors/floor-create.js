const repositionSprite = require('../sprites/sprite-reposition')
const floorTop = require('./floor-top')
const floorLeft = require('./floor-left')
const floorZIndex = require('./floor-z-index')

// Creates and places a floor sprite at the provided row and column in a room
module.exports = function (room, row, col) {
  const floor = document.createElement('div')
  floor.id = `f${row}-${col}`
  floor.classList.add('floor')
  repositionSprite(
    floor,
    floorTop(row, col),
    floorLeft(room, row, col),
    floorZIndex(row, col)
  )
  return floor
}
