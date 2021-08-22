import state from '../state/index.mjs'

module.exports = function () {
  while (state.dom.renderWindow.firstChild) {
    state.dom.renderWindow.removeChild(state.dom.renderWindow.lastChild)
  }
}
