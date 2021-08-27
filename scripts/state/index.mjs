import defineStateHolder from './define-state-holder'
import registerState from './register-state'

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
//   keyBinding: {
//     movePlayerNorth: { key: 'w', code: 'KeyW' },
//     movePlayerWest: { key: 'a', code: 'KeyA' },
//     movePlayerSouth: { key: 's', code: 'KeyS' },
//     movePlayerEast: { key: 'd', code: 'KeyD' },
//     toggleOpacity: { key: 'o', code: 'KeyO' },
//     togglePlayerSprite: { key: 'p', code: 'KeyP' }
//   }
//   asciiMap: null,
//   currentBoard: null
// }
// ```

const state = {}

registerState(state, 'paused', false)

registerState(state, 'seeThroughWalls')
registerState(state, 'asciiMap')
registerState(state, 'currentBoard')

defineStateHolder(state, 'player')
registerState(state.player, 'player.row')
registerState(state.player, 'player.col')

defineStateHolder(state, 'dom')
registerState(state.dom, 'dom.player')
registerState(state.dom, 'dom.renderWindow',
  document.getElementById('render-window')
)
registerState(state.dom, 'dom.asciiMap',
  document.getElementById('ascii-map')
)

export default state
