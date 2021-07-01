const state = require('../state')

class PlayerCol extends HTMLSpanElement {
  connectedCallback () {
    this.attachShadow({ mode: 'open' })
    this.updateTextContent()
    window.addEventListener(
      'statechange:player.col',
      () => this.updateTextContent()
    )
  }

  updateTextContent () {
    this.shadowRoot.textContent = state.player.col
  }
}

customElements.define('player-col', PlayerCol, { extends: 'span' })

module.exports = PlayerCol
