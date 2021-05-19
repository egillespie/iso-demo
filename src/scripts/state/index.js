const _internalState = {
  seeThroughWalls: false
}

const state = {
  dom: {
    renderWindow: document.getElementById('render-window'),
    player: document.getElementById('player'),
    asciiMap: document.getElementById('ascii-map')
  },
  player: {
    row: 0,
    col: 0
  },
  asciiMap: null,
  currentBoard: null
}

Object.defineProperty(state, 'seeThroughWalls', {
  get () {
    return _internalState.seeThroughWalls
  },
  set (newValue) {
    const oldValue = _internalState.seeThroughWalls
    if (newValue !== oldValue) {
      _internalState.seeThroughWalls = newValue
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

module.exports = state
