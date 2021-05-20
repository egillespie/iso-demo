const state = require('../state')

class SeeThroughWallsLabel extends HTMLSpanElement {
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

customElements.define(
  'see-through-walls-label',
  SeeThroughWallsLabel,
  { extends: 'span' }
)

module.exports = SeeThroughWallsLabel
