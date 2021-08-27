import state from '../state/index.mjs'

export default function () {
  while (state.dom.renderWindow.firstChild) {
    state.dom.renderWindow.removeChild(state.dom.renderWindow.lastChild)
  }
}
