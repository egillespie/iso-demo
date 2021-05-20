const registerState = require('./register-state')

// Sample game state:
// ```
// {
//   seeThroughWalls: false,
//   player: {
//     row: 5,
//     col: 4
//   },
//   dom: {
//     renderWindow: document.getElementById('render-window'),
//     player: document.getElementById('player'),
//     asciiMap: document.getElementById('ascii-map')
//   },
//   asciiMap: null,
//   currentBoard: null
// }
// ```

const state = {}

Object.defineProperty(state, 'player', {
  value: {},
  enumerable: true,
  writable: false
})

Object.defineProperty(state, 'dom', {
  value: {},
  enumerable: true,
  writable: false
})

registerState(state, 'seeThroughWalls')
registerState(state, 'asciiMap')
registerState(state, 'currentBoard')
registerState(state.player, 'player.row')
registerState(state.player, 'player.col')
registerState(state.dom, 'dom.player')
registerState(state.dom, 'dom.renderWindow',
  document.getElementById('render-window')
)
registerState(state.dom, 'dom.asciiMap',
  document.getElementById('ascii-map')
)

module.exports = state
