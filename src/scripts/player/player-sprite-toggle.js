const state = require('../state')

// Cycle between different player sprites
module.exports = function () {
  state.dom.player.classList.toggle('boy')
  state.dom.player.classList.toggle('girl')
}
