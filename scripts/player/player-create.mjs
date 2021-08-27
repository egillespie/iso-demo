import createSprite from '../sprites/sprite-create.mjs'
import insertSprite from '../sprites/sprite-insert.mjs'
import state from '../state/index.mjs'

export default function (gender) {
  const player = createSprite('player')
  player.classList.add('player', gender)
  state.dom.player = player
  insertSprite(player)
}
