const insertSprite = require('../sprites/sprite-insert')
const createWallCapIfExposed = require('./wall-cap-create-if-exposed')

// Removes wall caps that are no longer exposed by translucent walls
// and adds wall caps where newly exposed.
module.exports = function (room, positions) {
  for (const position of positions) {
    const [row, col] = position
    const capId = `c${row}-${col}-clip`
    const cap = document.getElementById(capId)
    if (cap) {
      cap.remove()
    } else {
      const newCap = createWallCapIfExposed(room, row, col)
      if (newCap) {
        newCap.id = capId
        newCap.classList.add('clip-cap')
        insertSprite(newCap)
      }
    }
  }
}
