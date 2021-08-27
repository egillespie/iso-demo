import state from '../state/index.mjs'
import createElement from './util/create-element.mjs'

const html = /* html */`
  <style>
  .ascii-map-container {
    margin-bottom: 0.625rem;
  }

  .ascii-map-chars {
    display: inline-block;
    font-family: Courier, monospace;
    font-size: var(--ui-font-size-sm);
    line-height: var(--ui-font-size-sm);
    position: relative;
    left: 50%;
    transform: translateX(-50%);
  }

  .ascii-row {
    white-space: pre;
  }

  .player {
    font-weight: bold;
  }

  .ascii-space[data-orig-char="."]:not(.player) {
    color: #7c7a7c;
  }

  .ascii-space[data-orig-char="D"]:not(.player) {
    color: #a52a2a;
  }

  .ascii-space[data-orig-char="#"]:not(.player) {
    color: #064866;
  }
  </style>
  <div id="map-container" class="ascii-map-container"></div>
`

export default class AsciiMap extends HTMLElement {
  constructor () {
    super()
    this.initializeLayout()
  }

  connectedCallback () {
    window.addEventListener('statechange:asciimap', this)
    window.addEventListener('statechange:player.row', this)
    window.addEventListener('statechange:player.col', this)
  }

  disconnectedCallback () {
    window.removeEventListener('statechange:asciimap', this)
    window.removeEventListener('statechange:player.row', this)
    window.removeEventListener('statechange:player.col', this)
  }

  handleEvent (event) {
    switch (event.type) {
      case 'statechange:asciimap':
        this.resetMap()
        break
      case 'statechange:player.row':
      case 'statechange:player.col':
        this.updatePlayerPos()
        break
    }
  }

  initializeLayout () {
    this.attachShadow({ mode: 'open' })
    this.shadowRoot.innerHTML = html
    this.mapContainer = this.shadowRoot.getElementById('map-container')
    this.resetMap()
  }

  resetMap () {
    if (state.asciiMap) {
      this.elementMap = []
      const mapChars = createElement('div', { class: 'ascii-map-chars' })
      for (let row = 0; row < state.asciiMap.length; row++) {
        this.elementMap[row] = []
        const asciiRow = createElement('div', { class: 'ascii-row' })
        for (let col = 0; col < state.asciiMap[row].length; col++) {
          const asciiChar = state.asciiMap[row][col]
          const space = createElement('span', { class: 'ascii-space' })
          space.dataset.origChar = asciiChar
          space.textContent = asciiChar
          this.elementMap[row][col] = space
          asciiRow.appendChild(space)
        }
        mapChars.appendChild(asciiRow)
      }
      const oldMapChars = this.mapContainer.firstElementChild
      if (oldMapChars) {
        this.mapContainer.replaceChild(mapChars, oldMapChars)
      } else {
        this.mapContainer.appendChild(mapChars)
      }
      this.updatePlayerPos()
    }
  }

  updatePlayerPos () {
    if (this.playerRow !== undefined && this.playerCol !== undefined) {
      const oldSpace = this.elementMap[this.playerRow][this.playerCol]
      oldSpace.classList.remove('player')
      oldSpace.textContent = oldSpace.dataset.origChar
    }

    this.playerRow = state.player.row
    this.playerCol = state.player.col

    if (this.playerRow !== undefined && this.playerCol !== undefined) {
      const space = this.elementMap[this.playerRow][this.playerCol]
      space.classList.add('player')
      space.textContent = '@'
    }
  }
}

customElements.define('ascii-map', AsciiMap)
