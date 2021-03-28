const state = require('../state')

// Cycle between different player sprites
module.exports = function () {
  state.player.classList.toggle('boy')
  state.player.classList.toggle('girl')
}
