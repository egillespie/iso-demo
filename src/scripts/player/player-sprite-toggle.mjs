const state = require('../state')

// Cycle between different player sprites
export default function () {
  state.dom.player.classList.toggle('boy')
  state.dom.player.classList.toggle('girl')
}
