import state from '../state/index.mjs'

export default class PlayerRow extends HTMLSpanElement {
  constructor () {
    super()
    this._syncContent = this.syncContent.bind(this)
    this.attachShadow({ mode: 'open' })
    this.syncContent()
  }

  connectedCallback () {
    window.addEventListener('statechange:player.row', this._syncContent)
  }

  disconnectedCallback () {
    window.removeEventListener('statechange:player.row', this._syncContent)
  }

  syncContent () {
    this.shadowRoot.textContent = state.player.row
  }
}

customElements.define('player-row', PlayerRow, { extends: 'span' })
