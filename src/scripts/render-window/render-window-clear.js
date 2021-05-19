const state = require('../state')

module.exports = function () {
  while (state.dom.renderWindow.firstChild) {
    state.dom.renderWindow.removeChild(state.dom.renderWindow.lastChild)
  }
}
