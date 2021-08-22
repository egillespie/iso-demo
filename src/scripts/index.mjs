import activateEventManager from './events/index.mjs'
import createBoard from './boards/board-create.mjs'
import createPlayer from './player/player-create.mjs'
import movePlayerTo from './player/player-move-to-position.mjs'
import registerComponents from './components/index.mjs'

registerComponents()

createBoard()
createPlayer('girl')
movePlayerTo(4, 5)

activateEventManager()
