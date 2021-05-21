const state = require('../state')
const deepCopy = require('../util/deep-copy')

class AsciiMap extends HTMLElement {
  constructor () {
    super()
    this.resetMap()
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
    const asciiMapString = this.asciiMap ? this.asciiMap.join('\n') : ''
    this.innerHTML = `<pre><code>${asciiMapString}</code></pre>`
  }
}

customElements.define('ascii-map', AsciiMap)

module.exports = AsciiMap
