import state from '../state/index.mjs'

class SeeThroughWallsLabel extends HTMLSpanElement {
  constructor () {
    super()
    this._syncContent = this.syncContent.bind(this)
    this.attachShadow({ mode: 'open' })
    this.syncContent()
  }

  connectedCallback () {
    window.addEventListener('statechange:seethroughwalls', this._syncContent)
  }

  disconnectedCallback () {
    window.removeEventListener('statechange:seethroughwalls', this._syncContent)
  }

  syncContent () {
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
