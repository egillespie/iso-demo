import state from '../state/index.mjs'

class PlayerCol extends HTMLSpanElement {
  constructor () {
    super()
    this._syncContent = this.syncContent.bind(this)
    this.attachShadow({ mode: 'open' })
    this.syncContent()
  }

  connectedCallback () {
    window.addEventListener('statechange:player.col', this._syncContent)
  }

  disconnectedCallback () {
    window.removeEventListener('statechange:player.col', this._syncContent)
  }

  syncContent () {
    this.shadowRoot.textContent = state.player.col
  }
}

customElements.define('player-col', PlayerCol, { extends: 'span' })

module.exports = PlayerCol
