const createBoard = require('./boards/board-create')
const createPlayer = require('./player/player-create')
const movePlayerTo = require('./player/player-move-to-position')
const handleKeyDown = require('./events/handle-key-down')

createBoard()
createPlayer('girl')
movePlayerTo(4, 5)

window.addEventListener('keydown', handleKeyDown)
