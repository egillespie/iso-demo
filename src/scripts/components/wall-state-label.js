const state = require('../state')

class WallStateLabel extends HTMLSpanElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.updateTextContent()
    window.addEventListener(
      'statechange:seethroughwalls',
      () => this.updateTextContent()
    )
  }

  updateTextContent () {
    this.shadowRoot.textContent = state.seeThroughWalls
      ? 'translucent'
      : 'opaque'
  }
}

customElements.define('wall-state-label', WallStateLabel, { extends: 'span' })

module.exports = WallStateLabel
