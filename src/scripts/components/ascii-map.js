const cssUrl = require('url:../../styles/components/ascii-map.css')
const state = require('../state')
const deepCopy = require('../util/deep-copy')

class AsciiMap extends HTMLElement {
  constructor () {
    super()
    this.attachShadow({ mode: 'open' })
    this.initializeLayout()
    this.addEventListeners()
  }

  initializeLayout () {
    const link = document.createElement('link')
    link.setAttribute('rel', 'stylesheet')
    link.setAttribute('href', cssUrl)

    const pre = document.createElement('pre')
    this.code = document.createElement('code')
    pre.appendChild(this.code)

    this.shadowRoot.append(link, pre)
    this.resetMap()
  }

  addEventListeners () {
    window.addEventListener(
      'statechange:asciimap',
      () => this.resetMap()
    )
    window.addEventListener(
      'statechange:player.row',
      () => this.updatePlayerPosition()
    )
    window.addEventListener(
      'statechange:player.col',
      () => this.updatePlayerPosition()
    )
  }

  resetMap () {
    this.asciiMap = deepCopy(state.asciiMap)
    this.resetPlayerPosition()
    this.drawMap()
  }

  updatePlayerPosition () {
    this.resetPlayerPosition()
    this.setPlayerPositionToChar('@')
    this.drawMap()
  }

  resetPlayerPosition () {
    if (this.playerRow !== undefined && this.playerCol !== undefined) {
      const ch = state.asciiMap[this.playerRow][this.playerCol]
      this.setPlayerPositionToChar(ch)
    }
    this.playerRow = state.player.row
    this.playerCol = state.player.col
  }

  setPlayerPositionToChar (ch) {
    if (this.playerRow !== undefined && this.playerCol !== undefined) {
      this.asciiMap[this.playerRow] = this.replaceCharAt(
        this.asciiMap[this.playerRow],
        this.playerCol,
        ch
      )
    }
  }

  replaceCharAt (str, index, ch) {
    return str.substr(0, index) + ch + str.substr(index + 1)
  }

  drawMap () {
    this.code.textContent = this.asciiMap ? this.asciiMap.join('\n') : ''
  }
}

customElements.define('ascii-map', AsciiMap)

module.exports = AsciiMap
