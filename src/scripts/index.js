const state = require('./state')
const createBoard = require('./boards/board-create')
const createPlayer = require('./player/player-create')
const insertSprite = require('./sprites/sprite-insert')
const movePlayerTo = require('./player/player-move-to-position')
const handleKeyDown = require('./events/handle-key-down')

while (state.dom.renderWindow.firstChild) {
  state.dom.renderWindow.removeChild(state.dom.renderWindow.lastChild)
}
createBoard()
insertSprite(createPlayer('girl'))
movePlayerTo(state.currentBoard, 4, 5)

window.addEventListener('keydown', handleKeyDown)
