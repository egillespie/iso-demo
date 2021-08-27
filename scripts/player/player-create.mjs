import createSprite from '../sprites/sprite-create'
import insertSprite from '../sprites/sprite-insert'
import state from '../state/index'

export default function (gender) {
  const player = createSprite('player')
  player.classList.add('player', gender)
  state.dom.player = player
  insertSprite(player)
}
