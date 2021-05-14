const state = require('../state')
const createSprite = require('../sprites/sprite-create')

module.exports = function (gender) {
  const player = createSprite('player')
  player.classList.add('player', gender)
  state.dom.player = player
  return player
}
