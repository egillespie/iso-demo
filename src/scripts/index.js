const createBoard = require('./boards/board-create')
const createPlayer = require('./player/player-create')
const movePlayerTo = require('./player/player-move-to-position')
const registerComponents = require('./components')
const activateEventManager = require('./events')

registerComponents()

createBoard()
createPlayer('girl')
movePlayerTo(4, 5)

activateEventManager()
