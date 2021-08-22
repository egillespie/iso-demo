import createSprite from '../sprites/sprite-create.mjs'
import insertSprite from '../sprites/sprite-insert.mjs'
const state = require('../state')

export default function (gender) {
  const player = createSprite('player')
  player.classList.add('player', gender)
  state.dom.player = player
  insertSprite(player)
}
