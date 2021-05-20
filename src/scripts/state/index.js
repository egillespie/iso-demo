const state = {
  dom: {
    renderWindow: document.getElementById('render-window'),
    player: document.getElementById('player'),
    asciiMap: document.getElementById('ascii-map')
  },
  asciiMap: null,
  currentBoard: null
}

//
// seeThroughWalls
//

Object.defineProperty(state, 'seeThroughWalls', {
  enumerable: true,
  get () {
    return this._seeThroughWalls
  },
  set (newValue) {
    const oldValue = this._seeThroughWalls
    if (newValue !== oldValue) {
      this._seeThroughWalls = newValue
      const event = new CustomEvent('statechange:seethroughwalls', {
        detail: {
          oldValue,
          newValue
        }
      })
      window.dispatchEvent(event)
    }
  }
})

//
// player
//

Object.defineProperty(state, 'player', {
  value: {},
  enumerable: true,
  writable: false
})

//
// player.row
//
Object.defineProperty(state.player, 'row', {
  enumerable: true,
  get () {
    return this._player_row
  },
  set (newValue) {
    const oldValue = this._player_row
    if (newValue !== oldValue) {
      this._player_row = newValue
      const event = new CustomEvent('statechange:player.row', {
        detail: {
          oldValue,
          newValue
        }
      })
      window.dispatchEvent(event)
    }
  }
})

//
// player.col
//
Object.defineProperty(state.player, 'col', {
  enumerable: true,
  get () {
    return this._player_col
  },
  set (newValue) {
    const oldValue = this._player_col
    if (newValue !== oldValue) {
      this._player_col = newValue
      const event = new CustomEvent('statechange:player.col', {
        detail: {
          oldValue,
          newValue
        }
      })
      window.dispatchEvent(event)
    }
  }
})

module.exports = state
