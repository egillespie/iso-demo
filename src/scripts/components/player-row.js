const state = require('../state')

class PlayerRow extends HTMLSpanElement {
  connectedCallback () {
    this.attachShadow({ mode: 'open' })
    this.updateTextContent()
    window.addEventListener(
      'statechange:player.row',
      () => this.updateTextContent()
    )
  }

  updateTextContent () {
    this.shadowRoot.textContent = state.player.row
  }
}

customElements.define('player-row', PlayerRow, { extends: 'span' })

module.exports = PlayerRow
