const state = require('../state')
const createSprite = require('../sprites/sprite-create')
const insertSprite = require('../sprites/sprite-insert')

module.exports = function (gender) {
  const player = createSprite('player')
  player.classList.add('player', gender)
  state.dom.player = player
  insertSprite(player)
}
