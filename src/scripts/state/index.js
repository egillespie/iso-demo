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
  currentBoard: null,
  seeThroughWalls: false
}

module.exports = state
