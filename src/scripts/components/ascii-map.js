const state = require('../state')
const createElement = require('./util/create-element')
const createStyleElement = require('./util/create-style-element')
const css = require('bundle-text:../../styles/components/ascii-map.css')

class AsciiMap extends HTMLElement {
  constructor () {
    super()
    this._resetMap = this.resetMap.bind(this)
    this._updatePlayerPos = this.updatePlayerPos.bind(this)
    this.attachShadow({ mode: 'open' })
    this.initializeLayout()
  }

  connectedCallback () {
    window.addEventListener('statechange:asciimap', this._resetMap)
    window.addEventListener('statechange:player.row', this._updatePlayerPos)
    window.addEventListener('statechange:player.col', this._updatePlayerPos)
  }

  disconnectedCallback () {
    window.removeEventListener('statechange:asciimap', this._resetMap)
    window.removeEventListener('statechange:player.row', this._updatePlayerPos)
    window.removeEventListener('statechange:player.col', this._updatePlayerPos)
  }

  initializeLayout () {
    this.mapContainer = createElement('div', { class: 'ascii-map-container' })
    this.resetMap()
    this.shadowRoot.append(createStyleElement(css), this.mapContainer)
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

module.exports = AsciiMap
