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

const state = {
  dom: {
    renderWindow: document.getElementById('render-window'),
    player: document.getElementById('player'),
    asciiMap: document.getElementById('ascii-map')
  },
  asciiMap: null,
  currentBoard: null
}

Object.defineProperty(state, 'player', {
  value: {},
  enumerable: true,
  writable: false
})

registerState(state, 'seeThroughWalls')
registerState(state.player, 'player.row')
registerState(state.player, 'player.col')

module.exports = state
